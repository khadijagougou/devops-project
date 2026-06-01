package com.example.E_commerce.Platform.ws.provider;

import com.example.E_commerce.Platform.entities.Cart;
import com.example.E_commerce.Platform.services.facade.CartService;
import com.example.E_commerce.Platform.ws.converter.CartConverter;
import com.example.E_commerce.Platform.ws.dto.CartDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/cart")
public class CartProvider {
    @Autowired
    private CartService cartService;
    @Autowired
    private CartConverter cartConverter;

    @PostMapping
    public ResponseEntity<CartDto> save(@RequestBody CartDto cartDto) {
        Cart cartEntity = cartConverter.toEntity(cartDto);
        Cart savedCart = cartService.save(cartEntity);
        CartDto dto = cartConverter.toDto(savedCart);
        return ResponseEntity.ok(dto);

    }

    @GetMapping
    public ResponseEntity<List<CartDto>> findAll() {
        List<Cart> carts = cartService.findAll();
        List<CartDto> cartDtos = cartConverter.toDtos(carts);
        return ResponseEntity.ok(cartDtos);
    }

    @DeleteMapping("id/{id}")
    public ResponseEntity<Long> deleteById(@PathVariable Long id) {
        cartService.deleteById(id);
        return ResponseEntity.ok(id);

    }

    @PutMapping("id/{id}")
    public ResponseEntity<CartDto> update(@PathVariable Long id,@RequestBody CartDto cartDto) {
        Cart cartEntity = cartConverter.toEntity(cartDto);
        Cart savedCart = cartService.update(id,cartEntity);
        CartDto dto = cartConverter.toDto(savedCart);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("user/{userId}")
    public ResponseEntity<CartDto> findByUserId(@PathVariable Long userId) {
        Cart cartByUserId = cartService.findByUserId(userId);
        CartDto dto = cartConverter.toDto(cartByUserId);
        return ResponseEntity.ok(dto);
    }

    @PutMapping("clear/id/{id}")
    public ResponseEntity<String> clearCart(@PathVariable Long id) {
        cartService.clearCart(id);
        return ResponseEntity.ok("ok");
    }

    @DeleteMapping("/remove/cartId/{cartId}/cartItemId/{cartItemId}")
    public ResponseEntity<String> removeCartItem(
            @PathVariable Long cartId,
            @PathVariable Long cartItemId) {
        cartService.removeCartItem(cartId, cartItemId);
        return ResponseEntity.ok("Item removed from cart");
    }
    @PutMapping("/{cartId}/items/{productId}")
    public ResponseEntity<String> updateQuantity(
            @PathVariable Long cartId,
            @PathVariable Long productId,
            @RequestParam int quantity) {

        cartService.updateQuantity(productId, quantity, cartId);
        return ResponseEntity.ok("Quantity updated");
    }
}
