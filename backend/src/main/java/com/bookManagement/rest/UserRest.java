package com.bookManagement.rest;
import com.bookManagement.pojo.User;
import com.burgerManagement.dto.UserDTO;
import org.springframework.http.ResponseEntity;
import java.util.List;

public interface UserRest {
    List<UserDTO> getAllUsers();
    ResponseEntity<User> getUserById(Long id);
    ResponseEntity<User> saveUser(User user);
    ResponseEntity<User> updateUser(Long id, User user);
    ResponseEntity<Void> deleteUser(Long id);
}
