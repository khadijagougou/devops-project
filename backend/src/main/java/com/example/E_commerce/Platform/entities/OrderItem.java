package com.example.E_commerce.Platform.entities;

import jakarta.persistence.*;
import lombok.Data;
@Data
@Entity
public class OrderItem extends ArticleItem {
    @ManyToOne
    private Order order;
}
