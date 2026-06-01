package com.example.E_commerce.Platform.ws.provider;

import com.example.E_commerce.Platform.entities.Coupon;
import com.example.E_commerce.Platform.services.facade.CouponService;
import com.example.E_commerce.Platform.ws.converter.CouponConverter;
import com.example.E_commerce.Platform.ws.dto.CouponDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/coupon")
public class CouponProvider {
    @Autowired
    private CouponService couponService;
    @Autowired
    private CouponConverter couponConverter;

    @PostMapping
    public ResponseEntity<CouponDto> save(@RequestBody CouponDto couponDto) {
        Coupon couponEntity = couponConverter.toEntity(couponDto);
        Coupon savedCoupon = couponService.save(couponEntity);
        CouponDto dto = couponConverter.toDto(savedCoupon);
        return ResponseEntity.ok(dto);

    }

    @GetMapping
    public ResponseEntity<List<CouponDto>> findAll() {
        List<Coupon> coupons = couponService.findAll();
        List<CouponDto> couponDtos = couponConverter.toDtos(coupons);
        return ResponseEntity.ok(couponDtos);
    }

    @DeleteMapping("id/{id}")
    public ResponseEntity<Long> deleteById(@PathVariable Long id) {
        couponService.deleteById(id);
        return ResponseEntity.ok(id);

    }

    @PutMapping("id/{id}")
    public ResponseEntity<CouponDto> update(@PathVariable Long id,@RequestBody CouponDto couponDto) {
        Coupon couponEntity = couponConverter.toEntity(couponDto);
        Coupon savedCoupon = couponService.update(id,couponEntity);
        CouponDto dto = couponConverter.toDto(savedCoupon);
        return ResponseEntity.ok(dto);
    }
    @GetMapping("name/{name}")
    public ResponseEntity<CouponDto> findByName(@PathVariable String name) {

        Coupon coupon = couponService.findByName(name);

        if (coupon == null) {
            return ResponseEntity.notFound().build();
        }

        CouponDto dto = couponConverter.toDto(coupon);

        return ResponseEntity.ok(dto);
    }
   
}
