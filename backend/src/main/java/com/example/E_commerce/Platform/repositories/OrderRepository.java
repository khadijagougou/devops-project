package com.example.E_commerce.Platform.repositories;

import com.example.E_commerce.Platform.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

   public List<Order> findByUserId(Long userId);
}
