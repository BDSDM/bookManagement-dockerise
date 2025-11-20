package com.bookManagement.restImpl;

import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/upload")
public class FileUploadController {

    private static final String UPLOAD_DIR = "uploads/";

    @PostMapping("/image")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("File is empty");
        }

        // Nettoyer le nom du fichier
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        // Créer le répertoire s’il n’existe pas
        File uploadDir = new File(UPLOAD_DIR);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }

        // Sauvegarder le fichier
        Path path = Paths.get(UPLOAD_DIR + fileName);
        Files.write(path, file.getBytes());

        // Retourner l’URL (ex: http://localhost:8080/uploads/image.jpg)
        String fileUrl = "http://localhost:8080/" + UPLOAD_DIR + fileName;
        return ResponseEntity.ok(fileUrl);
    }
}
