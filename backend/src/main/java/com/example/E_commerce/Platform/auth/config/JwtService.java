package com.example.E_commerce.Platform.auth.config;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {
    private String secretKey ="uXxWGp4p3m8V5RZanW0g7tO9ENiZ7haxghtRjQpAOGO=";
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    private Claims extractAllClaims(String token) {
        SecretKey key = getSignIngKey();
        return Jwts
                .parser()
                .verifyWith(key)
                .build()
                .parseClaimsJws(token)
                .getPayload();
    }
    //claimsResolver est une fonction qu’on passe en paramètre. Elle prend un objet Claims en entrée et retourne un champ spécifique.
    // exemple : Pour extraire le nom d’utilisateur  extractClaim(token, Claims::getSubject);
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    private SecretKey getSignIngKey() {
        byte[] keyBytes = Decoders.BASE64.decode(this.secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
    public String generateToken(Map<String, Object> extraClaims,
                                UserDetails userDetails) {
        System.out.println("USERNAME = " + userDetails.getUsername());
        return Jwts.builder()
                .claims()
                .add(extraClaims)
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))
                .and()
                .signWith(getSignIngKey())
                .compact();

    }
    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(),userDetails);
    }
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }


}
