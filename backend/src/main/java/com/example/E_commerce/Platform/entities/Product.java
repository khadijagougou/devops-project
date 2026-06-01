package com.example.E_commerce.Platform.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @JdbcTypeCode(SqlTypes.LONGVARCHAR)
    private String description;
    private Double price;
    private int quantity;
    private String fileName;
    @ManyToOne

    private Category category;

    @JsonIgnore
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<CartItem> cartItems;
    @JsonIgnore

    @OneToMany(mappedBy = "product")
    private List<OrderItem> orderItems;

}
