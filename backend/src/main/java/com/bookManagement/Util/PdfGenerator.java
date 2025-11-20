// src/main/java/com/bookManagement/util/PdfGenerator.java
package com.bookManagement.Util;

import com.bookManagement.dto.BookDTO;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.springframework.stereotype.Component;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Component
public class PdfGenerator {

    public byte[] generateOrdersPdf(String usernameOrEmail, List<BookDTO> orders) throws IOException {
        try (PDDocument document = new PDDocument(); ByteArrayOutputStream baos = new ByteArrayOutputStream()) {

            PDPage page = new PDPage();
            document.addPage(page);

            try (PDPageContentStream content = new PDPageContentStream(document, page)) {

                // Titre
                content.beginText();
                content.setFont(PDType1Font.HELVETICA_BOLD, 16);
                content.newLineAtOffset(50, 750);
                content.showText("Récapitulatif de vos commandes");
                content.endText();

                // Email / utilisateur
                content.beginText();
                content.setFont(PDType1Font.HELVETICA, 12);
                content.newLineAtOffset(50, 720);
                content.showText("Utilisateur : " + (usernameOrEmail == null ? "" : usernameOrEmail));
                content.endText();

                // Liste des livres
                int y = 690;
                for (int i = 0; i < orders.size(); i++) {
                    BookDTO book = orders.get(i);
                    if (y < 100) {
                        // Nouvelle page si trop bas
                        content.close();
                        page = new PDPage();
                        document.addPage(page);
                        try (PDPageContentStream cs = new PDPageContentStream(document, page)) {
                            y = 750;
                            content.beginText();
                            content.setFont(PDType1Font.HELVETICA, 12);
                            content.newLineAtOffset(50, y);
                            content.showText(String.format("%d) %s — %s", i + 1, book.getTitle(), book.getAuthor()));
                            content.endText();
                        }
                    } else {
                        content.beginText();
                        content.setFont(PDType1Font.HELVETICA, 12);
                        content.newLineAtOffset(50, y);
                        content.showText(String.format("%d) %s — %s", i + 1, book.getTitle(), book.getAuthor()));
                        content.endText();
                    }
                    y -= 20;
                }
            }

            document.save(baos);
            return baos.toByteArray();
        }
    }
}
