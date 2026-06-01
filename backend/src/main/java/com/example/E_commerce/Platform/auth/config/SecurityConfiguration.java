package com.example.E_commerce.Platform.auth.config;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
//spring security will try to look for bean of type security filter chain
//and this bean is responsible of configuring all the http security of our app
public class SecurityConfiguration {
    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    //whitelist homa dok les api li fash kan executiwhom makan7tajoshh l authentication
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth

                        .requestMatchers("/api/v1/auth/**","/api/paypal/**").permitAll()
                        .requestMatchers(HttpMethod.GET,
                                "/api/product/**",
                                "/api/category/**",
                                "/api/coupon/name/**"
                        ).permitAll()
                        .requestMatchers("/api/files/**").permitAll()

                        .requestMatchers(HttpMethod.PUT, "/api/cart/**").hasRole("CUSTOMER")
                        .requestMatchers(HttpMethod.GET, "/api/cart/**").hasRole("CUSTOMER")

                        .requestMatchers(HttpMethod.POST, "/api/order/**").hasAnyRole("CUSTOMER", "ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/order/**").hasAnyRole("CUSTOMER", "ADMIN")

                        .requestMatchers(HttpMethod.POST,
                                "/api/product/**",
                                "/api/category/**",
                                "/api/coupon/**"
                        ).hasRole("ADMIN")

                        .requestMatchers(HttpMethod.PUT,
                                "/api/product/**",
                                "/api/category/**",
                                "/api/coupon/**"
                        ).hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/cart-item/update/cartItemId/**").hasRole("CUSTOMER")

                        .requestMatchers(HttpMethod.DELETE,
                                "/api/product/**",
                                "/api/category/**",
                                "/api/coupon/**"
                        ).hasRole("ADMIN")

                        .anyRequest().authenticated()
                )
                //our session means every request should be authenticated so we should not store the authentcation state

                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                )
                .authenticationProvider(authenticationProvider)
                // le filtre jwtAuthFilter sera exécuté avant le filtre UsernamePasswordAuthenticationFilter dans la chaîne de filtres de Spring Security
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOrigins(List.of("http://localhost:5173"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }

}