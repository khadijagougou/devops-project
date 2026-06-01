package com.example.E_commerce.Platform.services.facade;

import com.example.E_commerce.Platform.entities.Cart;
import com.example.E_commerce.Platform.entities.CartItem;

import java.util.List;

public interface CartService {
    Cart save(Cart cart);

    void deleteById(Long id);

    Cart findById(Long id);

    List<Cart> findAll();

    Cart update(Long id, Cart cart);

    Cart findByUserId(Long userId);

    void clearCart(Long cartId);


    void removeCartItem(Long cartId, Long cartItemId);

    void updateQuantity(Long productId, int quantity,Long cartId);

    }
