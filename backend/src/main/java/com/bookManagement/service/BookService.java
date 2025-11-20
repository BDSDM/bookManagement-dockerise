package com.bookManagement.service;

import com.bookManagement.dto.BookDTO;
import com.bookManagement.pojo.Book;

import java.util.List;
import java.util.Optional;

public interface BookService {
    Book saveBook(BookDTO bookDTO);           // CREATE
    List<Book> getAllBooks();                 // READ (tous)
    Optional<Book> getBookById(Long id);      // READ (un seul)
    Book updateBook(Long id, BookDTO bookDTO);// UPDATE
    void deleteBook(Long id);                 // DELETE
}
