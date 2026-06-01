package com.example.E_commerce.Platform.services.facade;

import com.example.E_commerce.Platform.entities.OrderItem;

import java.util.List;

public interface OrderItemService {
    OrderItem save(OrderItem orderItem);

    void deleteById(Long id);

    OrderItem findById(Long id);

    List<OrderItem> findAll();

    OrderItem update(Long id, OrderItem orderItem);
}
