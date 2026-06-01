package com.example.E_commerce.Platform.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Inheritance(strategy = InheritanceType.JOINED)
public class ArticleItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne

    private Product product;
    private int quantity;
    private double unitPrice;

}
