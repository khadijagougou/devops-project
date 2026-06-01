package com.example.E_commerce.Platform.services.facade;

import com.example.E_commerce.Platform.entities.Order;
import com.example.E_commerce.Platform.enums.OrderStatus;
import com.example.E_commerce.Platform.ws.dto.OrderDto;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public interface OrderService {
    Order save(Order order);

    void deleteById(Long id);

    Order findById(Long id);

    List<Order> findAll();

    Order update(Long id, Order order);
    List<Order> findByUserId(Long userId);
    Order updateStatus( Long idOrder,  OrderStatus status) throws Exception;
}
