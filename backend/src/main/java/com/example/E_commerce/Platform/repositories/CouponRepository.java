package com.example.E_commerce.Platform.repositories;

import com.example.E_commerce.Platform.entities.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CouponRepository extends JpaRepository<Coupon, Long> {
    Coupon findByName(String name);
}
