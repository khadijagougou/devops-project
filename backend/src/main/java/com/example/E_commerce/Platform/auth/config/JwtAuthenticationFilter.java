package com.example.E_commerce.Platform.auth.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
// as the name of our class(onceper...) this will be active every time we get a request
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    //these parameters should not be null , that's why we add @NonNull
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {
        // fl header dyalna endna bzaf dyal les attributs mnhom authorization li katkon mktoba ela had shekal Authorization : Bearer siuehizuehdi(jwt)
        // had la valeur dyal authorization hiya li kan7to fhad la variable authHeader
        String path = request.getRequestURI();
        if (path.startsWith("/api/paypal/")
                || path.startsWith("/actuator")) {
            filterChain.doFilter(request, response);
            return;
        }
        final String authHeader = request.getHeader("Authorization");
        System.out.println("AUTH HEADER = " + authHeader);
        final String jwt;
        final String userEmail;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            //Passe la requête au filtre suivant
            filterChain.doFilter(request, response);
            return;
        }
        jwt = authHeader.substring(7);
        System.out.println("JWT = " + jwt);
        userEmail = jwtService.extractUsername(jwt);
        System.out.println("EMAIL = " + userEmail);
        // SecurityContextHolder... signifie que Est-ce que l’utilisateur n’est pas encore authentifié
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            //check if the user exist or not
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
            //check if the token is valid
            //if the user is valid we will update the securitycontext and send the request to dispatcherservlet
            System.out.println("TOKEN VALID = " + jwtService.isTokenValid(jwt, userDetails));
            if (jwtService.isTokenValid(jwt, userDetails)) {
                // la classe UsernamePasswordAuthenticationToken sert a
                //recevoir les identifiants de l'user
                //et stocker l'user authentifié dans le SecurityContext
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request));
                //update the securityContextHolder
                System.out.println(SecurityContextHolder.getContext().getAuthentication());
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request, response);
    }
}