// src/main/java/com/bookManagement/controller/OrdersController.java
package com.bookManagement.controller;

import com.bookManagement.dto.OrdersEmailRequest;
import com.bookManagement.service.OrdersEmailService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/orders")
public class OrdersController {

    @Autowired
    private OrdersEmailService ordersEmailService;

    @PostMapping("/send-email")
    public ResponseEntity<String> sendOrdersEmail(@RequestBody OrdersEmailRequest request) {
        try {
            ordersEmailService.sendOrdersByEmail(request);
            return ResponseEntity.ok("Email envoyé avec succès !");
        } catch (IOException | MessagingException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erreur lors de l'envoi du mail : " + e.getMessage());
        }
    }
}
