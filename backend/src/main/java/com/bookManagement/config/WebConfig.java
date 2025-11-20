package com.bookManagement.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class  WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Mappe les requêtes /uploads/** vers le dossier physique "uploads/"
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:uploads/"); // chemin relatif au projet
    }
}
