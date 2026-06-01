package com.example.E_commerce.Platform.services.impl;

import com.example.E_commerce.Platform.entities.Cart;
import com.example.E_commerce.Platform.entities.Order;
import com.example.E_commerce.Platform.entities.User;
import com.example.E_commerce.Platform.enums.Role;
import com.example.E_commerce.Platform.repositories.UserRepository;
import com.example.E_commerce.Platform.services.facade.UserService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User findById(Long id) {
        return  userRepository.findById(id).orElse(null) ;
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public User update(Long id, User newUser) {
        User oldUser = findById(id);
        oldUser.setFirstname(newUser.getFirstname());
        oldUser.setLastname(newUser.getLastname());
        oldUser.setEmail(newUser.getEmail());
        oldUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        oldUser.setRole(newUser.getRole());
        oldUser.setCart(newUser.getCart());
        oldUser.setOrders(newUser.getOrders());
        oldUser.setAddress(newUser.getAddress());
        oldUser.setVille(newUser.getVille());
        oldUser.setCodePostal(newUser.getCodePostal());
       return userRepository.save(oldUser);
    }

    @Override
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }



    @PostConstruct
    public void createAdmin(){
        Optional<User> admin = userRepository.findByEmail("admin@gmail.com");
        if (admin.isPresent()){return;}
        User user = new User();
        user.setFirstname("Admin");
        user.setLastname("Admin");
        user.setEmail("admin@gmail.com");
        user.setPassword(passwordEncoder.encode("1111"));
        user.setRole(Role.ADMIN);
        user.setAddress("123 Avenue du Luxe,\n" +
                "75008 Paris, France");
        user.setVille("Paris");
        user.setCodePostal("75008");
        userRepository.save(user);
    }
}
