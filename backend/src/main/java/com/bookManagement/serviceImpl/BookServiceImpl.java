package com.bookManagement.serviceImpl;

import com.bookManagement.dao.BookDao;
import com.bookManagement.dao.UserDao;
import com.bookManagement.dto.BookDTO;
import com.bookManagement.pojo.Book;
import com.bookManagement.pojo.User;
import com.bookManagement.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookDao bookDao;

    @Autowired
    private UserDao userDao; // 🔹 pour récupérer l'utilisateur depuis l'id

    @Override
    public Book saveBook(BookDTO bookDTO) {
        Book book = new Book();
        book.setTitle(bookDTO.getTitle());
        book.setAuthor(bookDTO.getAuthor());
        book.setTotal(bookDTO.getTotal());
        book.setStatus(bookDTO.getStatus());
        book.setImage(bookDTO.getImage());

        // 🔹 Lier le livre à un utilisateur
        if (bookDTO.getUserid() != null) {
            User user = userDao.findById(bookDTO.getUserid())
                    .orElseThrow(() -> new RuntimeException(
                            "Utilisateur non trouvé avec l'id : " + bookDTO.getUserid()));
            book.setUser(user);
        }

        return bookDao.save(book);
    }

    @Override
    public List<Book> getAllBooks() {
        return bookDao.findAll();
    }

    @Override
    public Optional<Book> getBookById(Long id) {
        return bookDao.findById(id);
    }

    @Override
    public Book updateBook(Long id, BookDTO bookDTO) {
        Optional<Book> optionalBook = bookDao.findById(id);

        if (optionalBook.isPresent()) {
            Book book = optionalBook.get();
            book.setTitle(bookDTO.getTitle());
            book.setAuthor(bookDTO.getAuthor());
            book.setTotal(bookDTO.getTotal());
            book.setStatus(bookDTO.getStatus());
            book.setImage(bookDTO.getImage());

            if (bookDTO.getUserid() != null) {
                User user = userDao.findById(bookDTO.getUserid())
                        .orElseThrow(() -> new RuntimeException(
                                "Utilisateur non trouvé avec l'id : " + bookDTO.getUserid()));
                book.setUser(user);
            }

            return bookDao.save(book);
        } else {
            throw new RuntimeException("Livre non trouvé avec l'id : " + id);
        }
    }

    @Override
    public void deleteBook(Long id) {
        if (bookDao.existsById(id)) {
            bookDao.deleteById(id);
        } else {
            throw new RuntimeException("Livre non trouvé avec l'id : " + id);
        }
    }
}
