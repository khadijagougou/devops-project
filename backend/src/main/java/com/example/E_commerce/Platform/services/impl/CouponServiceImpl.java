package com.example.E_commerce.Platform.services.impl;

import com.example.E_commerce.Platform.entities.Coupon;
import com.example.E_commerce.Platform.repositories.CouponRepository;
import com.example.E_commerce.Platform.services.facade.CouponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class CouponServiceImpl implements CouponService {
    @Autowired
    private CouponRepository couponRepository;

    @Override
    public Coupon save(Coupon coupon) {
        return couponRepository.save(coupon);
    }

    @Override
    public void deleteById(Long id) {
        couponRepository.deleteById(id);
    }

    @Override
    public Coupon findById(Long id) {
        return couponRepository.findById(id).orElse(null);
    }

    @Override
    public List<Coupon> findAll() {
        return couponRepository.findAll();
    }

    @Override
    public Coupon update(Long id, Coupon newCoupon) {
        Coupon oldCoupon = findById(id);
        oldCoupon.setName(newCoupon.getName());
        oldCoupon.setCouponType(newCoupon.getCouponType());
        oldCoupon.setStartDate(newCoupon.getStartDate());
        oldCoupon.setOrders(newCoupon.getOrders());
        oldCoupon.setActive(newCoupon.isActive());
        oldCoupon.setValue(newCoupon.getValue());
        oldCoupon.setExpirationDate(newCoupon.getExpirationDate());
        return couponRepository.save(oldCoupon);
    }

    @Override
    public Coupon findByName(String name) {

        Coupon coupon = couponRepository.findByName(name);

        if (coupon == null) {
            return null;
        }

        if (!coupon.isActive()) {
            return null;
        }

        if (coupon.getExpirationDate().isBefore(LocalDate.now())) {
            return null;
        }

        return coupon;
    }
}
