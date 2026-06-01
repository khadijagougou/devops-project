package com.example.E_commerce.Platform.repositories;

import com.example.E_commerce.Platform.entities.Cart;
import com.example.E_commerce.Platform.entities.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    CartItem cart(Cart cart);
}
