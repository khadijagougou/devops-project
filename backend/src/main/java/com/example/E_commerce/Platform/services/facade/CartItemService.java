package com.example.E_commerce.Platform.services.facade;

import com.example.E_commerce.Platform.entities.Cart;
import com.example.E_commerce.Platform.entities.CartItem;

import java.util.List;

public interface CartItemService {
    CartItem save(CartItem cartItem);

    void deleteById(Long id);

    CartItem findById(Long id);

    List<CartItem> findAll();

    CartItem update(Long id, CartItem cartItem);
    public CartItem addCartItemToCart(Long userId, Long productId, int quantity);
    CartItem updateCartItemQuantity(Long id, int quantity);

}
