package com.example.E_commerce.Platform.ws.provider;

import com.example.E_commerce.Platform.entities.Product;
import com.example.E_commerce.Platform.entities.User;
import com.example.E_commerce.Platform.services.facade.UserService;
import com.example.E_commerce.Platform.ws.converter.UserConverter;
import com.example.E_commerce.Platform.ws.dto.ProductDto;
import com.example.E_commerce.Platform.ws.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/user")
public class UserProvider {
    @Autowired
    private UserService userService;
    @Autowired
    private UserConverter userConverter;

    @PostMapping
    public ResponseEntity<UserDto> save(@RequestBody UserDto userDto) {
        User userEntity = userConverter.toEntity(userDto);
        User savedUser = userService.save(userEntity);
        UserDto dto = userConverter.toDto(savedUser);
        return ResponseEntity.ok(dto);

    }

    @GetMapping
    public ResponseEntity<List<UserDto>> findAll() {
        List<User> users = userService.findAll();
        List<UserDto> userDtos = userConverter.toDtos(users);
        return ResponseEntity.ok(userDtos);
    }

    @DeleteMapping("id/{id}")
    public ResponseEntity<Long> deleteById(@PathVariable Long id) {
        userService.deleteById(id);
        return ResponseEntity.ok(id);

    }

    @PutMapping("id/{id}")
    public ResponseEntity<UserDto> update(@PathVariable Long id,@RequestBody UserDto userDto) {
        User userEntity = userConverter.toEntity(userDto);
        User savedUser = userService.update(id,userEntity);
        UserDto dto = userConverter.toDto(savedUser);
        return ResponseEntity.ok(dto);
    }
    @GetMapping("id/{id}")
    public ResponseEntity<UserDto> findById(@PathVariable Long id) {
        User user = userService.findById(id);
        UserDto userDto = userConverter.toDto(user);
        return ResponseEntity.ok(userDto);
    }

}
