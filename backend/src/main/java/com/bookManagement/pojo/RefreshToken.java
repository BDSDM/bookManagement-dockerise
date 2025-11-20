package com.bookManagement.pojo;

public class RefreshToken {

    private String token;

    // Constructeur vide requis par Jackson
    public RefreshToken() {
    }

    // Constructeur avec argument
    public RefreshToken(String token) {
        this.token = token;
    }

    // Getter
    public String getToken() {
        return token;
    }

    // Setter
    public void setToken(String token) {
        this.token = token;
    }
}
