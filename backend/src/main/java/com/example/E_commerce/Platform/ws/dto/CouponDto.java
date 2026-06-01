package com.example.E_commerce.Platform.ws.dto;

import com.example.E_commerce.Platform.entities.Order;
import com.example.E_commerce.Platform.enums.CouponType;
import jakarta.persistence.OneToMany;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class CouponDto {
    private Long id;

    private String name;

    private Double value;

    private CouponType couponType;

    private LocalDate startDate;

    private LocalDate expirationDate;

    private boolean active;

}
