// src/main/java/com/bookManagement/dto/OrdersEmailRequest.java
package com.bookManagement.dto;

import java.util.List;

public class OrdersEmailRequest {

    private String email; // email du user
    private List<BookDTO> orders; // livres empruntés

    public OrdersEmailRequest() {}

    public OrdersEmailRequest(String email, List<BookDTO> orders) {
        this.email = email;
        this.orders = orders;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<BookDTO> getOrders() {
        return orders;
    }

    public void setOrders(List<BookDTO> orders) {
        this.orders = orders;
    }
}
