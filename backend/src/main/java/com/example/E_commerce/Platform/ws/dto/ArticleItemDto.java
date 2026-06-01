package com.example.E_commerce.Platform.ws.dto;

import com.example.E_commerce.Platform.entities.Product;
import lombok.Data;

@Data
public class ArticleItemDto {
    private Long id;
    private Long productId;
    private int quantity;
    private double unitPrice;
}
