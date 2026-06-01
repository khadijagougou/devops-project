package com.example.E_commerce.Platform.ws.dto;

import com.example.E_commerce.Platform.entities.Cart;
import lombok.Data;

@Data
public class CartItemDto {
    private Long id;
    private Long cartId;
    private Long productId;
    private int quantity;
    private double unitPrice;
}
