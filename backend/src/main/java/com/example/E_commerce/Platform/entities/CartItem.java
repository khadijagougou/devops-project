package com.example.E_commerce.Platform.entities;

import jakarta.persistence.*;
import lombok.Data;
@Data
@Entity
public class CartItem extends ArticleItem {
    @ManyToOne
    private Cart cart;

}
