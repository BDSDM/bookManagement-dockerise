package com.bookManagement.dto;

public class AuthResponse {
    private String token;
    private String refreshToken;
    public AuthResponse(String token, String refreshToken) {
        this.token = token;
        this.refreshToken = refreshToken;
    }


    // Getter pour token
    public String getToken() {
        return token;
    }

    // Setter pour token
    public void setToken(String token) {
        this.token = token;
    }

    // Getter pour refreshToken
    public String getRefreshToken() {
        return refreshToken;
    }

    // Setter pour refreshToken
    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}
