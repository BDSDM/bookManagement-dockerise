package com.bookManagement.restImpl;


import com.bookManagement.dao.UserDao;
import com.bookManagement.jwt.JwtUtil;
import com.bookManagement.pojo.RefreshToken;
import com.bookManagement.pojo.User;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthControllerRefreshToken {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDao userDao;

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestBody RefreshToken refreshToken, HttpServletRequest request) {
        String token = refreshToken.getToken();

        // Extraire l'email du refresh token
        String email = jwtUtil.extractEmail(token);

        if (jwtUtil.isTokenValid(token, email)) {
            // 🔍 Rechercher l'utilisateur à partir de l'email
            Optional<User> optionalUser = userDao.findByEmail(email);

            if (optionalUser.isEmpty()) {
                return ResponseEntity.status(404).body("Utilisateur introuvable");
            }

            User user = optionalUser.get();

            // 🔁 Générer le nouveau token avec les vraies infos
            String name = user.getName();
            Long id = user.getId();
            String role = user.getRole();

            String newAccessToken = jwtUtil.generateToken(id, email, role, name);

            // 👉 Retourner le nouveau token dans une réponse JSON
            return ResponseEntity.ok().body("{\"accessToken\": \"" + newAccessToken + "\"}");
        } else {
            return ResponseEntity.status(403).body("Refresh token invalide");
        }
    }
}
