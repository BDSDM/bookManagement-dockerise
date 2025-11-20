package com.bookManagement.dao;

import com.bookManagement.pojo.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserDao extends JpaRepository<User, Long> {
    // méthodes utiles supplémentaires (exemples)
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}
