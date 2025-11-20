package com.bookManagement.dto;

public class BookDTO {

    private String title;
    private String author;
    private Integer total;
    private Boolean status;
    private String image;
    private Long userid; // uniquement l'id de l'utilisateur

    // ---------- Constructeurs ----------
    public BookDTO() {
    }

    public BookDTO(String title, String author, Integer total, Boolean status, String image, Long userid) {
        this.title = title;
        this.author = author;
        this.total = total;
        this.status = status;
        this.image = image;
        this.userid = userid;
    }

    // ---------- Getters ----------
    public String getTitle() {
        return title;
    }

    public String getAuthor() {
        return author;
    }

    public Integer getTotal() {
        return total;
    }

    public Boolean getStatus() {
        return status;
    }

    public String getImage() {
        return image;
    }

    public Long getUserid() {
        return userid;
    }

    // ---------- Setters ----------
    public void setTitle(String title) {
        this.title = title;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public void setUserid(Long userid) {
        this.userid = userid;
    }
}
