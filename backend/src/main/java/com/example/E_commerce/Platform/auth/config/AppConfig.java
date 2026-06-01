package com.example.E_commerce.Platform.auth.config;

import com.example.E_commerce.Platform.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

//this class will hold all the apps config su as beans
@Configuration
@RequiredArgsConstructor
public class AppConfig {
    private final UserRepository userRepository;
    //bean always should be public no private
    @Bean
    // utilisé pour charger les infos d'un user a partir de la BD lors de l'authentification
    //Spring Security va appeler cette méthode automatiquement pendant l’authentification
    public UserDetailsService userDetailsService() {
        return username -> userRepository.findByEmail(username).orElseThrow(
                () -> new UsernameNotFoundException("User not found"));

    }
    @Bean
    public AuthenticationProvider authenticationProvider() {

        DaoAuthenticationProvider authProvider =
                new DaoAuthenticationProvider(userDetailsService());

        authProvider.setPasswordEncoder(passwordEncoder());

        return authProvider;
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Bean
    //responsible to manage the authentication
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}