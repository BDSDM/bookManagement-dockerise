package com.bookManagement.restImpl;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.Principal;
import java.util.*;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/auth")
public class ColorController {

    private static final int ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;
    private static final int MAX_FAVORITES = 12;

    private final ObjectMapper mapper = new ObjectMapper();

    private static final Pattern HEX = Pattern.compile("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$");
    private static final Pattern RGB = Pattern.compile("^rgba?\\s*\\(\\s*\\d+\\s*,\\s*\\d+\\s*,\\s*\\d+(\\s*,\\s*\\d*\\.?\\d+)?\\s*\\)$", Pattern.CASE_INSENSITIVE);

    private boolean isValidColor(String c) {
        if (c == null) return false;
        String s = c.trim();
        return HEX.matcher(s).matches() || RGB.matcher(s).matches();
    }

    private String sanitizeEmailForCookie(String email) {
        return email.replaceAll("[@.]", "_");
    }

    private Optional<String> readCookie(HttpServletRequest req, String name) {
        if (req.getCookies() == null) return Optional.empty();
        for (jakarta.servlet.http.Cookie cookie : req.getCookies()) {
            if (name.equals(cookie.getName())) {
                String decoded = URLDecoder.decode(cookie.getValue(), StandardCharsets.UTF_8);
                return Optional.of(decoded);
            }
        }
        return Optional.empty();
    }

    private void writeCookie(HttpServletResponse resp, String name, String value, int maxAgeSeconds) {
        String encoded = URLEncoder.encode(value, StandardCharsets.UTF_8);
        ResponseCookie rc = ResponseCookie.from(name, encoded)
                .path("/")
                .maxAge(maxAgeSeconds)
                .sameSite("Lax")
                .httpOnly(false)
                .secure(false)
                .build();
        resp.addHeader(HttpHeaders.SET_COOKIE, rc.toString());
    }

    private void deleteCookie(HttpServletResponse resp, String name) {
        ResponseCookie rc = ResponseCookie.from(name, "")
                .path("/")
                .maxAge(0)
                .sameSite("Lax")
                .httpOnly(false)
                .secure(false)
                .build();
        resp.addHeader(HttpHeaders.SET_COOKIE, rc.toString());
    }

    // ---------- Endpoints ----------

    @PostMapping("/color")
    public ResponseEntity<?> setColor(@RequestBody Map<String, String> body,
                                      HttpServletResponse response,
                                      Principal principal) {
        String color = body.get("color");
        if (!isValidColor(color)) {
            return ResponseEntity.badRequest().body(Map.of("error", "Color missing or invalid"));
        }

        String email = principal.getName();
        String cookieName = "bgColor_" + sanitizeEmailForCookie(email);

        writeCookie(response, cookieName, color.trim(), ONE_YEAR_SECONDS);
        return ResponseEntity.ok(Map.of("color", color.trim()));
    }

    @GetMapping("/color")
    public ResponseEntity<?> getColor(HttpServletRequest request, Principal principal) {
        String email = principal.getName();
        String cookieName = "bgColor_" + sanitizeEmailForCookie(email);

        Optional<String> o = readCookie(request, cookieName);
        return ResponseEntity.ok(Map.of("color", o.orElse(null)));
    }

    @DeleteMapping("/color")
    public ResponseEntity<?> deleteColor(HttpServletResponse response, Principal principal) {
        String email = principal.getName();
        String cookieName = "bgColor_" + sanitizeEmailForCookie(email);
        deleteCookie(response, cookieName);
        return ResponseEntity.ok(Map.of("message", "bgColor deleted"));
    }

    @PostMapping("/color/favorite")
    public ResponseEntity<?> addFavorite(@RequestBody Map<String, String> body,
                                         HttpServletRequest request,
                                         HttpServletResponse response,
                                         Principal principal) {
        String color = body.get("color");
        if (!isValidColor(color)) {
            return ResponseEntity.badRequest().body(Map.of("error", "Color missing or invalid"));
        }

        String email = principal.getName();
        String cookieName = "bgFavorites_" + sanitizeEmailForCookie(email);

        List<String> favs = readFavoritesFromRequest(request, cookieName);
        favs.removeIf(c -> c.equalsIgnoreCase(color.trim()));
        favs.add(0, color.trim());
        if (favs.size() > MAX_FAVORITES) favs = favs.subList(0, MAX_FAVORITES);
        saveFavorites(response, cookieName, favs);

        return ResponseEntity.ok(Map.of("favorites", favs));
    }

    @GetMapping("/color/favorites")
    public ResponseEntity<?> getFavorites(HttpServletRequest request, Principal principal) {
        String email = principal.getName();
        String cookieName = "bgFavorites_" + sanitizeEmailForCookie(email);

        List<String> favs = readFavoritesFromRequest(request, cookieName);
        return ResponseEntity.ok(Map.of("favorites", favs));
    }

    @DeleteMapping("/color/favorite")
    public ResponseEntity<?> removeFavorite(@RequestParam("color") String color,
                                            HttpServletRequest request,
                                            HttpServletResponse response,
                                            Principal principal) {
        if (color == null || color.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "color param required"));
        }

        String email = principal.getName();
        String cookieName = "bgFavorites_" + sanitizeEmailForCookie(email);

        List<String> favs = readFavoritesFromRequest(request, cookieName);
        favs.removeIf(c -> c.equalsIgnoreCase(color.trim()));
        saveFavorites(response, cookieName, favs);

        return ResponseEntity.ok(Map.of("favorites", favs));
    }

    @DeleteMapping("/color/favorites")
    public ResponseEntity<?> clearFavorites(HttpServletResponse response, Principal principal) {
        String email = principal.getName();
        String cookieName = "bgFavorites_" + sanitizeEmailForCookie(email);
        deleteCookie(response, cookieName);
        return ResponseEntity.ok(Map.of("message", "favorites deleted"));
    }

    // ---------- Helpers favorites ----------
    private List<String> readFavoritesFromRequest(HttpServletRequest request, String cookieName) {
        try {
            Optional<String> raw = readCookie(request, cookieName);
            if (raw.isEmpty()) return new ArrayList<>();
            List<String> arr = mapper.readValue(raw.get(), new TypeReference<List<String>>() {});
            List<String> cleaned = new ArrayList<>();
            for (String s : arr) {
                if (isValidColor(s)) {
                    cleaned.add(s.trim());
                    if (cleaned.size() >= MAX_FAVORITES) break;
                }
            }
            return cleaned;
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }

    private void saveFavorites(HttpServletResponse response, String cookieName, List<String> favorites) {
        try {
            String json = mapper.writeValueAsString(favorites);
            writeCookie(response, cookieName, json, ONE_YEAR_SECONDS);
        } catch (Exception e) {
            deleteCookie(response, cookieName);
        }
    }
}
