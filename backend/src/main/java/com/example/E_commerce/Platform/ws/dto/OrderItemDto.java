package com.example.E_commerce.Platform.ws.dto;

import lombok.Data;

@Data
public class OrderItemDto {
    private Long id;
    private Long productId;
    private int quantity;
    private double unitPrice;
}
