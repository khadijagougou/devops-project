package com.example.E_commerce.Platform.services.impl;

import com.example.E_commerce.Platform.entities.Cart;
import com.example.E_commerce.Platform.entities.CartItem;
import com.example.E_commerce.Platform.entities.Product;
import com.example.E_commerce.Platform.entities.User;
import com.example.E_commerce.Platform.repositories.CartItemRepository;
import com.example.E_commerce.Platform.repositories.CartRepository;
import com.example.E_commerce.Platform.repositories.ProductRepository;
import com.example.E_commerce.Platform.repositories.UserRepository;
import com.example.E_commerce.Platform.services.facade.CartService;
import com.example.E_commerce.Platform.services.facade.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Service
public class CartServiceImpl implements CartService {
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Override
    public Cart save(Cart cart) {
        return cartRepository.save(cart);
    }

    @Override
    public void deleteById(Long id) {
        cartRepository.deleteById(id);
    }

    @Override
    public Cart findById(Long id) {
        return cartRepository.findById(id).orElse(null);
    }

    @Override
    public List<Cart> findAll() {
        return cartRepository.findAll();
    }

    @Override
    public Cart update(Long id, Cart newCart) {
        Cart oldCart = findById(id);
        oldCart.setCartItems(newCart.getCartItems());
        oldCart.setUser(oldCart.getUser());
        return cartRepository.save(oldCart);
    }

    @Override
    public Cart findByUserId(Long userId) {
        return cartRepository.findByUserId(userId);
    }

    @Override
    public void clearCart(Long cartId) {
        Cart cart = cartRepository.findById(cartId).orElse(null);
        cart.getCartItems().clear();
        cartRepository.save(cart);
    }



    @Override
    public void removeCartItem(Long cartId, Long cartItemId) {

        Cart cart = findById(cartId);

        cart.getCartItems().removeIf(
                item -> item.getId().equals(cartItemId)
        );

        cartRepository.save(cart);
    }
    @Override
    public void updateQuantity(Long productId, int quantity, Long cartId) {
        Cart cart = findById(cartId);

        cart.getCartItems().stream()
                .filter(item -> item.getProduct().getId().equals(productId))
                .findFirst()
                .ifPresent(item -> item.setQuantity(quantity));

        cartRepository.save(cart);
    }




}
