package com.example.E_commerce.Platform.services.impl;

import com.example.E_commerce.Platform.entities.OrderItem;
import com.example.E_commerce.Platform.repositories.OrderItemRepository;
import com.example.E_commerce.Platform.services.facade.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderItemServiceImpl implements OrderItemService {
    @Autowired
    private OrderItemRepository orderItemRepository;

    @Override
    public OrderItem save(OrderItem orderItem) {
        return orderItemRepository.save(orderItem);
    }

    @Override
    public void deleteById(Long id) {
        orderItemRepository.deleteById(id);
    }

    @Override
    public OrderItem findById(Long id) {
        return orderItemRepository.findById(id).orElse(null);
    }

    @Override
    public List<OrderItem> findAll() {
        return orderItemRepository.findAll();
    }

    @Override
    public OrderItem update(Long id, OrderItem newOrderItem) {
        OrderItem oldOrderItem = findById(id);
        oldOrderItem.setProduct(newOrderItem.getProduct());
        oldOrderItem.setQuantity(newOrderItem.getQuantity());
        oldOrderItem.setUnitPrice(newOrderItem.getUnitPrice());
        oldOrderItem.setOrder(oldOrderItem.getOrder());
        return orderItemRepository.save(oldOrderItem);
    }


}
