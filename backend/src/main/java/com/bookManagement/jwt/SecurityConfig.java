package com.bookManagement.jwt;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

@Configuration
public class SecurityConfig {
    private final JwtFilter jwtFilter;

    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/auth/login",
                                "/api/upload/**","/uploads/**",
                                "/auth/register",
                                "/api/reset-password/request",
                                "/api/reset-password/confirm",
                                "/api/auth/refresh-token", "/cookies/**"
                        ).permitAll()
                        .requestMatchers("/api/burgers/**").authenticated()
                        .requestMatchers("/api/drinks/**").authenticated()
                        .requestMatchers("/api/books/**").authenticated()
                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .cors(cors -> cors.configurationSource(request -> {
                    CorsConfiguration config = new CorsConfiguration();
                    config.setAllowCredentials(true);

                    // ✅ Seule origine autorisée (ton Angular en dev)
                    config.addAllowedOrigin("http://localhost:4200");

                    // ✅ Autoriser tous les headers et méthodes
                    config.addAllowedHeader("*");
                    config.addAllowedMethod("*");

                    // ✅ Si tu veux lire le token renvoyé dans la réponse
                    config.addExposedHeader("Authorization");

                    return config;
                }));

        return http.build();
    }
}
