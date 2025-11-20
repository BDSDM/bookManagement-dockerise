package com.bookManagement.serviceImpl;

import com.bookManagement.Util.EmailUtil;
import com.bookManagement.dao.PasswordResetTokenDao;
import com.bookManagement.dao.UserDao;
import com.bookManagement.pojo.PasswordResetToken;
import com.bookManagement.pojo.User;
import com.bookManagement.service.PasswordResetService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class PasswordResetServiceImpl implements PasswordResetService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private PasswordResetTokenDao tokenRepository;

    @Autowired
    private EmailUtil emailUtil;

    // 🔹 Injection de la valeur via VM option (ou valeur par défaut = 30)
    @Value("${password.reset.token.expiration:30}")
    private int expirationMinutes;

    @Override
    public void createPasswordResetToken(String email) {
        // 1. Récupérer l'utilisateur
        User user = userDao.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "Aucun utilisateur trouvé avec l'email : " + email));

        // 2. Générer le nouveau token et sa date d'expiration
        String tokenStr = UUID.randomUUID().toString();
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.MINUTE, expirationMinutes); // 🔑 utilisation de la valeur injectée
        Date expiryDate = cal.getTime();

        // 3. Mettre à jour si un token existe, sinon en créer un nouveau
        Optional<PasswordResetToken> opt = tokenRepository.findByUser(user);
        if (opt.isPresent()) {
            PasswordResetToken existing = opt.get();
            existing.setToken(tokenStr);
            existing.setExpiryDate(expiryDate);
            tokenRepository.save(existing);
        } else {
            PasswordResetToken newToken = new PasswordResetToken(tokenStr, user, expiryDate);
            tokenRepository.save(newToken);
        }

        // 4. Envoyer l'email
        String resetUrl = "http://localhost:4200/reset-password?token=" + tokenStr;
        String subject = "Réinitialisation de votre mot de passe";
        String body = "Bonjour,\n\n" +
                "Cliquez sur ce lien pour réinitialiser votre mot de passe :\n" +
                resetUrl + "\n\n" +
                "Ce lien expirera dans " + expirationMinutes + " minutes.";

        emailUtil.sendEmail(user.getEmail(), subject, body);
    }

    @Override
    public boolean resetPassword(String token, String newPassword) {
        Optional<PasswordResetToken> tokenOpt = tokenRepository.findByToken(token);
        if (tokenOpt.isPresent()) {
            PasswordResetToken resetToken = tokenOpt.get();
            if (resetToken.getExpiryDate().before(new Date())) {
                return false;
            }
            User user = resetToken.getUser();
            user.setPassword(new BCryptPasswordEncoder().encode(newPassword));
            userDao.save(user);
            tokenRepository.delete(resetToken);
            return true;
        }
        return false;
    }
}
