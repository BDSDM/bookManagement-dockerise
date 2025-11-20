// src/main/java/com/bookManagement/service/OrdersEmailService.java
package com.bookManagement.service;

import com.bookManagement.dto.BookDTO;
import com.bookManagement.dto.OrdersEmailRequest;
import com.bookManagement.Util.EmailUtil;
import com.bookManagement.Util.PdfGenerator;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class OrdersEmailService {

    @Autowired
    private PdfGenerator pdfGenerator;

    @Autowired
    private EmailUtil emailUtil;

    public void sendOrdersByEmail(OrdersEmailRequest request) throws IOException, MessagingException {
        String email = request.getEmail();
        List<BookDTO> orders = request.getOrders();

        // Génère le PDF
        byte[] pdfBytes = pdfGenerator.generateOrdersPdf(email, orders);

        String subject = "Votre récapitulatif de commandes";
        String body = "Bonjour,\n\nVeuillez trouver en pièce jointe le récapitulatif de vos livres empruntés.\n\nCordialement,\nLa bibliothèque";

        emailUtil.sendEmailWithPdf(email, subject, body, pdfBytes);
    }
}
