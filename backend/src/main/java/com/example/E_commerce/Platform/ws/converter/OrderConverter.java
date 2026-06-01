package com.example.E_commerce.Platform.ws.converter;

import com.example.E_commerce.Platform.entities.Coupon;
import com.example.E_commerce.Platform.entities.Order;
import com.example.E_commerce.Platform.services.facade.CouponService;
import com.example.E_commerce.Platform.services.facade.OrderItemService;
import com.example.E_commerce.Platform.services.facade.ProductService;
import com.example.E_commerce.Platform.services.facade.UserService;
import com.example.E_commerce.Platform.ws.dto.OrderDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class OrderConverter {
    @Autowired
    private OrderItemConverter orderItemConverter;
    @Autowired
    private UserService userService;
    @Autowired
    private CouponService couponService;
    public OrderDto toDto(Order order) {

        OrderDto orderDto = new OrderDto();
        orderDto.setId(order.getId());
        orderDto.setUserId(order.getUser().getId());
        orderDto.setOrderItemDtos(orderItemConverter.toDtos(order.getOrderItems()));
        orderDto.setOrderDate(order.getOrderDate());
        orderDto.setOrderStatus(order.getOrderStatus());
        orderDto.setOrderNumber(order.getOrderNumber());
        orderDto.setTotal(order.getTotal());
        orderDto.setPaymentStatus(order.getPaymentStatus());

        if (order.getCoupon() != null) {
            orderDto.setCouponId(order.getCoupon().getId());
        }

        return orderDto;
    }

    public Order toEntity(OrderDto orderDto) {

        Order order = new Order();
        order.setId(orderDto.getId());
        order.setOrderItems(orderItemConverter.toEntities(orderDto.getOrderItemDtos()));
        order.setUser(userService.findById(orderDto.getUserId()));
        order.setOrderDate(orderDto.getOrderDate());
        order.setOrderStatus(orderDto.getOrderStatus());
        order.setOrderNumber(orderDto.getOrderNumber());
        order.setPaymentStatus(orderDto.getPaymentStatus());
        order.setTotal(orderDto.getTotal());

        if (orderDto.getCouponId() != null) {
            order.setCoupon(couponService.findById(orderDto.getCouponId()));
        } else {
            order.setCoupon(null);
        }

        return order;
    }
    public List<OrderDto> toDtos(List<Order> orders) {
        if (orders == null) return null;
        return orders.stream().map(this::toDto).collect(Collectors.toList());
    }
    public List<Order>  toEntities(List<OrderDto> orderDtos) {
        if (orderDtos == null) return null;
        return orderDtos.stream().map(this::toEntity).collect(Collectors.toList());
    }
}
