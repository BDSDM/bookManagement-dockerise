package com.bookManagement.restImpl;



import com.bookManagement.service.PasswordResetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/reset-password")
public class ResetForgotPasswordController {

    @Autowired
    private PasswordResetService resetService;

    @PostMapping("/request")
    public ResponseEntity<Map<String, String>> requestReset(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        resetService.createPasswordResetToken(email);
        return ResponseEntity.ok(Map.of("message", "Lien de réinitialisation envoyé par email."));
    }

    @PostMapping("/confirm")
    public ResponseEntity<Map<String, String>> confirmReset(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        String newPassword = request.get("newPassword");

        boolean success = resetService.resetPassword(token, newPassword);
        if (success) {
            return ResponseEntity.ok(Map.of("message", "Mot de passe réinitialisé avec succès."));
        } else {
            return ResponseEntity.badRequest().body(Map.of("message", "Token invalide ou expiré."));
        }
    }
}
