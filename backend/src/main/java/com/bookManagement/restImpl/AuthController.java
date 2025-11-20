package com.bookManagement.restImpl;



import com.bookManagement.dao.UserDao;
import com.bookManagement.dto.AuthResponse;
import com.bookManagement.jwt.JwtUtil;
import com.bookManagement.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDao userDao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> user) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.get("email"), user.get("password"))
            );
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Email ou mot de passe incorrect");
        }

        Optional<User> optionalUser = userDao.findByEmail(user.get("email"));
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(404).body("Utilisateur introuvable");
        }

        User u = optionalUser.get();

        String token = jwtUtil.generateToken(u.getId(), u.getEmail(), u.getRole(), u.getName());
        String refreshToken = jwtUtil.generateRefreshToken(u.getEmail(), u.getName(), u.getId(), u.getRole());

        AuthResponse response = new AuthResponse(token, refreshToken);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        // Vérifie si l'email existe déjà
        Optional<User> existingUser = userDao.findByEmail(user.getEmail());

        if (existingUser.isPresent()) {
            // Si l'email existe déjà, retourne une erreur
            return ResponseEntity
                    .badRequest()
                    .body("Erreur : cet email est déjà utilisé.");
        }

        // Sinon, encode le mot de passe et enregistre l'utilisateur
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("USER");
        userDao.save(user);

        return ResponseEntity.ok("Utilisateur enregistré");
    }

}
