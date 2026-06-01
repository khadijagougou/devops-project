package com.example.E_commerce.Platform.ws.dto;

import com.example.E_commerce.Platform.entities.CartItem;
import com.example.E_commerce.Platform.entities.User;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Data;

import java.util.List;
@Data
public class CartDto {
    private Long id;
    private Long userId;
    private List<CartItemDto> cartItemDtos;
}
