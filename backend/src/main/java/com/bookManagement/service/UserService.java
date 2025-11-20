package com.bookManagement.service;




import com.bookManagement.pojo.User;

import java.util.List;

public interface UserService {
    List<com.burgerManagement.dto.UserDTO> getAllUsers();
    User getUserById(Long id);
    User saveUser(User user);
    User updateUser(Long id, User user);
    void deleteUser(Long id);
}
