package com.example.E_commerce.Platform.ws.dto;

import lombok.Data;


@Data
public class ProductDto {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private int quantity;
    private String fileName;
    private Long categoryId;


}
