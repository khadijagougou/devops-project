package com.example.E_commerce.Platform.entities;

import com.example.E_commerce.Platform.enums.CouponType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
public class Coupon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Double value;

    @Enumerated(EnumType.STRING)
    private CouponType couponType;

    private LocalDate startDate;

    private LocalDate expirationDate;

    private boolean active;
    @JsonIgnore

    @OneToMany(mappedBy = "coupon")
    private List<Order> orders;


}
