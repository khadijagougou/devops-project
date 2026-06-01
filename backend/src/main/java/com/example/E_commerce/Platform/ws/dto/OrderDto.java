package com.example.E_commerce.Platform.ws.dto;

import com.example.E_commerce.Platform.enums.OrderStatus;
import com.example.E_commerce.Platform.enums.PaymentStatus;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;
@Data
public class OrderDto {
    private Long id;
    private String orderNumber;
    private LocalDate orderDate;
    private OrderStatus orderStatus;
    private Long userId;
    private PaymentStatus paymentStatus;
    private List<OrderItemDto> orderItemDtos;
    private Long couponId;
    private Double total;
}
