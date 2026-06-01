package com.example.E_commerce.Platform.repositories;

import com.example.E_commerce.Platform.entities.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem,Long> {
}
