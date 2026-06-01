package com.example.E_commerce.Platform.services.impl;

import com.example.E_commerce.Platform.entities.Cart;
import com.example.E_commerce.Platform.entities.CartItem;
import com.example.E_commerce.Platform.entities.Product;
import com.example.E_commerce.Platform.entities.User;
import com.example.E_commerce.Platform.repositories.CartItemRepository;
import com.example.E_commerce.Platform.repositories.CartRepository;
import com.example.E_commerce.Platform.repositories.ProductRepository;
import com.example.E_commerce.Platform.repositories.UserRepository;
import com.example.E_commerce.Platform.services.facade.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartItemServiceImpl implements CartItemService {
    @Autowired
    private CartItemRepository cartItemRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private ProductRepository productRepository;

    @Override
    public CartItem save(CartItem cartItem) {
        return cartItemRepository.save(cartItem);
    }

    @Override
    public void deleteById(Long id) {
        cartItemRepository.deleteById(id);
    }

    @Override
    public CartItem findById(Long id) {
        return cartItemRepository.findById(id).orElse(null);
    }

    @Override
    public List<CartItem> findAll() {
        return cartItemRepository.findAll();
    }

    @Override
    public CartItem update(Long id, CartItem newCartItem) {
        CartItem oldCartItem = findById(id);
        oldCartItem.setProduct(newCartItem.getProduct());
        oldCartItem.setQuantity(newCartItem.getQuantity());
        oldCartItem.setUnitPrice(newCartItem.getUnitPrice());
        oldCartItem.setCart(newCartItem.getCart());
        return cartItemRepository.save(oldCartItem);
    }

    @Override
    public CartItem addCartItemToCart(Long userId, Long productId, int quantity) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Cart cart = cartRepository.findByUserId(userId);

        if (cart == null) {
            cart = new Cart();
            cart.setUser(user);
            CartItem cartItem = new CartItem();
            cartItem.setCart(cart);
            cartItem.setProduct(product);
            cartItem.setQuantity(quantity);
            cartItem.setUnitPrice(product.getPrice());
            cart.getCartItems().add(cartItem);
            cart = cartRepository.save(cart);
        }

        Optional<CartItem> existingItem = cart.getCartItems()
                .stream()
                .filter(item -> item.getProduct().getId().equals(productId))
                .findFirst();

        if (existingItem.isPresent()) {

            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + quantity);

            return cartItemRepository.save(item);
        }

        CartItem cartItem = new CartItem();
        cartItem.setCart(cart);
        cartItem.setProduct(product);
        cartItem.setQuantity(quantity);
        cartItem.setUnitPrice(product.getPrice());

        return cartItemRepository.save(cartItem);
    }
    @Override
    public CartItem updateCartItemQuantity(Long id, int quantity) {

        CartItem cartItem = cartItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("CartItem not found"));

        cartItem.setQuantity(quantity);

        return cartItemRepository.save(cartItem);
    }
}
