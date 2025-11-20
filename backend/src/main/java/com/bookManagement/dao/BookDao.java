package com.bookManagement.dao;

import com.bookManagement.pojo.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BookDao extends JpaRepository<Book, Long> {
    // exemples de requêtes utiles
    List<Book> findByAuthor(String author);
    List<Book> findByUserId(Long userId);
    List<Book> findByStatus(Boolean status);
}
