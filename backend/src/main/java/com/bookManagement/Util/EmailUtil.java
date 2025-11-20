package com.bookManagement.Util;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.springframework.core.io.ByteArrayResource;

@Component
public class EmailUtil {

    @Autowired
    private JavaMailSender mailSender;

    // ✅ 1. Méthode pour envoyer un email simple (sans pièce jointe)
    public void sendEmail(String toEmail, String subject, String body) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, false); // false = pas de pièce jointe

            helper.setFrom("tonemail@gmail.com"); // ✅ Remplace par ton email réel
            helper.setTo(toEmail);
            helper.setSubject(subject);
            helper.setText(body);

            mailSender.send(message);
            System.out.println("✅ Email envoyé à " + toEmail);
        } catch (MessagingException e) {
            throw new RuntimeException("❌ Erreur lors de l’envoi de l’email : " + e.getMessage(), e);
        }
    }

    // ✅ 2. Méthode pour envoyer un email avec PDF en pièce jointe
    public void sendEmailWithPdf(String toEmail, String subject, String body, byte[] pdfBytes)
            throws MessagingException {

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true); // true = multipart (pièce jointe)

        helper.setFrom("tonemail@gmail.com"); // ✅ Remplace par ton email réel
        helper.setTo(toEmail);
        helper.setSubject(subject);
        helper.setText(body);

        if (pdfBytes != null) {
            helper.addAttachment("emprunt.pdf", new ByteArrayResource(pdfBytes));
        }

        mailSender.send(message);
        System.out.println("✅ Email avec PDF envoyé à " + toEmail);
    }
}
