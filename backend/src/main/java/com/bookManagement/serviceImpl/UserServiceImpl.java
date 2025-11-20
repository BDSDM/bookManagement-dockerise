package com.bookManagement.serviceImpl;

import com.bookManagement.dao.UserDao;
import com.bookManagement.pojo.User;
import com.bookManagement.service.UserService;
import com.burgerManagement.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    @Override
    public List<UserDTO> getAllUsers() {
        List<User> users = userDao.findAll();

        return users.stream().map(user -> {
            UserDTO dto = new UserDTO();
            dto.setId(user.getId());
            dto.setName(user.getName());
            dto.setEmail(user.getEmail());
            dto.setRole(user.getRole());


            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public User getUserById(Long id) {
        return userDao.findById(id).orElse(null);
    }

    @Override
    public User saveUser(User user) {
        return userDao.save(user);
    }

    @Override
    public User updateUser(Long id, User updatedUser) {
        User user = userDao.findById(id).orElse(null);
        if (user != null) {
            user.setName(updatedUser.getName());
            user.setEmail(updatedUser.getEmail());
            user.setRole(updatedUser.getRole());
            return userDao.save(user);
        }
        return null;
    }

    @Override
    public void deleteUser(Long id) {
        userDao.deleteById(id);
    }
}
