package com.example.E_commerce.Platform.ws.dto;

import lombok.Data;
import java.util.List;

@Data
public class CartDto {
    private Long id;
    private Long userId;
    private List<CartItemDto> cartItemDtos;
}
