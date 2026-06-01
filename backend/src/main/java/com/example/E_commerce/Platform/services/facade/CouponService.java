package com.example.E_commerce.Platform.services.facade;

import com.example.E_commerce.Platform.entities.Coupon;

import java.util.List;

public interface CouponService {
    Coupon save(Coupon coupon);

    void deleteById(Long id);

    Coupon findById(Long id);

    List<Coupon> findAll();

    Coupon update(Long id, Coupon coupon);
    Coupon findByName(String name);
}
