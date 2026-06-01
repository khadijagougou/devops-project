package com.example.E_commerce.Platform.ws.converter;

import com.example.E_commerce.Platform.entities.Coupon;
import com.example.E_commerce.Platform.entities.Order;
import com.example.E_commerce.Platform.enums.CouponType;
import com.example.E_commerce.Platform.ws.dto.CouponDto;
import jakarta.persistence.OneToMany;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class CouponConverter {
    @Autowired
    private OrderConverter orderConverter;
    public CouponDto toDto(Coupon coupon) {
        CouponDto couponDto = new CouponDto();
        couponDto.setId(coupon.getId());
        couponDto.setName(coupon.getName());
        couponDto.setValue(coupon.getValue());
        couponDto.setCouponType(coupon.getCouponType());
        couponDto.setStartDate(coupon.getStartDate());
        couponDto.setExpirationDate(coupon.getExpirationDate());
        couponDto.setActive(coupon.isActive());
        return couponDto;

    }

    public Coupon toEntity(CouponDto couponDto) {
        Coupon coupon = new Coupon();
        coupon.setId(couponDto.getId());
        coupon.setName(couponDto.getName());
        coupon.setValue(couponDto.getValue());
        coupon.setCouponType(couponDto.getCouponType());
        coupon.setStartDate(couponDto.getStartDate());
        coupon.setExpirationDate(couponDto.getExpirationDate());
        coupon.setActive(couponDto.isActive());
        return coupon;
    }

    public List<CouponDto> toDtos(List<Coupon> coupons) {
        if (coupons == null) return null;
        return coupons.stream().map(this::toDto).collect(Collectors.toList());
    }
    public List<Coupon>  toEntities(List<CouponDto> couponDtos) {
        if (couponDtos == null) return null;
        return couponDtos.stream().map(this::toEntity).collect(Collectors.toList());
    }
}
