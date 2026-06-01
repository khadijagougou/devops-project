package com.example.E_commerce.Platform.services.facade;

import com.example.E_commerce.Platform.entities.User;

import java.util.List;

public interface UserService {
    User findById(Long id);

    List<User> findAll();

    User save(User user);

    User update(Long id, User user);

    void deleteById(Long id);
}
