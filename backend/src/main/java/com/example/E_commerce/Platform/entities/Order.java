package com.example.E_commerce.Platform.entities;

import com.example.E_commerce.Platform.enums.OrderStatus;
import com.example.E_commerce.Platform.enums.PaymentStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Entity
@Data
@Table(name="orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String orderNumber;
    private LocalDate orderDate;

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;
    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;
    @ManyToOne
    private User user;
    @JsonIgnore

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> orderItems;
    @ManyToOne
    @JoinColumn(name = "coupon_id")
    private Coupon coupon;
    private Double total;

}
