package com.example.E_commerce.Platform.ws.converter;

import com.example.E_commerce.Platform.entities.User;
import com.example.E_commerce.Platform.ws.dto.UserDto;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class UserConverter {
    public User toEntity(UserDto userDto) {
        if (userDto == null) return null;
        User user = new User();
        user.setId(userDto.getId());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        user.setFirstname(userDto.getFirstname());
        user.setLastname(userDto.getLastname());
        user.setRole(userDto.getRole());
        user.setAddress(userDto.getAddress());
        user.setVille(userDto.getVille());
        user.setCodePostal(userDto.getCodePostal());
        return user;
    }

    public UserDto toDto(User user) {
        if (user == null) return null;
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setEmail(user.getEmail());
        userDto.setPassword(user.getPassword());
        userDto.setFirstname(user.getFirstname());
        userDto.setLastname(user.getLastname());
        userDto.setRole(user.getRole());
        userDto.setAddress(user.getAddress());
        userDto.setVille(user.getVille());
        userDto.setCodePostal(user.getCodePostal());
        return userDto;
    }

    public List<UserDto> toDtos(List<User> users) {
        if (users == null) return null;
        return users.stream().map(this::toDto).collect(Collectors.toList());
    }

    public List<User> toEntities(List<UserDto> userDtos) {
        if (userDtos == null) return null;
        return userDtos.stream().map(this::toEntity).collect(Collectors.toList());
    }
}
