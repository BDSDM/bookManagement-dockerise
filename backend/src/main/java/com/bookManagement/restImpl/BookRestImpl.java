package com.bookManagement.restImpl;

import com.bookManagement.dto.BookDTO;
import com.bookManagement.pojo.Book;
import com.bookManagement.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "*")
public class BookRestImpl {

    @Autowired
    private BookService bookService;

    // 🔹 CREATE
    @PostMapping("/add")
    public ResponseEntity<Book> addBook(@RequestBody BookDTO bookDTO) {
        try {
            Book savedBook = bookService.saveBook(bookDTO);
            return ResponseEntity.ok(savedBook);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // 🔹 READ ALL
    @GetMapping("/all")
    public ResponseEntity<List<Book>> getAllBooks() {
        try {
            List<Book> books = bookService.getAllBooks();
            return ResponseEntity.ok(books);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // 🔹 READ BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        return bookService.getBookById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 🔹 UPDATE
    @PutMapping("/update/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable("id") Long id, @RequestBody BookDTO bookDTO) {
        try {
            Book updatedBook = bookService.updateBook(id, bookDTO);
            return ResponseEntity.ok(updatedBook);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // 🔹 DELETE
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBook(@PathVariable ("id") Long id) {
        try {
            bookService.deleteBook(id);
            return ResponseEntity.ok("Livre supprimé avec succès !");
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // 🔹 FILTRER PAR UTILISATEUR
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Book>> getBooksByUser(@PathVariable Long userId) {
        try {
            List<Book> books = bookService.getAllBooks()
                    .stream()
                    .filter(b -> b.getUser() != null && b.getUser().getId().equals(userId))
                    .toList();
            return ResponseEntity.ok(books);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
