package com.example.E_commerce.Platform.repositories;

import com.example.E_commerce.Platform.entities.Cart;
import com.example.E_commerce.Platform.entities.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    public Cart findByUserId(Long userId);

  /*  public void clearCart(Long id);

    public void addItemToCart(Long cartId, Long productId, int quantity);

    public void removeItem(Long cartId, Long productId);

    public void updateQuantity(Long productId, int quantity,Long cartId);*/
}
