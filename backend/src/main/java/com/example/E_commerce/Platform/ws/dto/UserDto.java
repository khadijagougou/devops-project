package com.example.E_commerce.Platform.ws.dto;
import com.example.E_commerce.Platform.entities.Cart;
import com.example.E_commerce.Platform.entities.Order;
import com.example.E_commerce.Platform.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private Long id;
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private Role role;
    private String address;
    private String ville;
    private String codePostal;

    public UserDto(Long id, String firstname, String lastname, String email, Role role, String address, String ville, String codePostal) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.role = role;
        this.address = address;
        this.ville = ville;
        this.codePostal = codePostal;
    }
}
