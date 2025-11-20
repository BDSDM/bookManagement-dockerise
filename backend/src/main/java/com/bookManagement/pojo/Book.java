package com.bookManagement.pojo;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // champs demandés
    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String author;

    @Column(nullable = false)
    private Integer total;

    @Column(nullable = false)
    private Boolean status;

    // ✅ Nouveau champ image
    @Column(nullable = true)
    private String image;

    // Relation vers User (many-to-one)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    // Constructeurs
    public Book() {
    }

    public Book(String title, String author, Integer total, Boolean status, String image) {
        this.title = title;
        this.author = author;
        this.total = total;
        this.status = status;
        this.image = image;
    }

    public Book(Long id, String title, String author, Integer total, Boolean status, String image) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.total = total;
        this.status = status;
        this.image = image;
    }

    // Getters & Setters
    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
