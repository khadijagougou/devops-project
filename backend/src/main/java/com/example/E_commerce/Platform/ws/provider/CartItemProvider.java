package com.example.E_commerce.Platform.ws.provider;

import com.example.E_commerce.Platform.entities.CartItem;
import com.example.E_commerce.Platform.services.facade.CartItemService;
import com.example.E_commerce.Platform.ws.converter.CartItemConverter;
import com.example.E_commerce.Platform.ws.dto.CartItemDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/cart-item")
public class CartItemProvider {
    @Autowired
    private CartItemService cartItemService;
    @Autowired
    private CartItemConverter cartItemConverter;

    @PostMapping
    public ResponseEntity<CartItemDto> save(@RequestBody CartItemDto cartItemDto) {
        CartItem cartItemEntity = cartItemConverter.toEntity(cartItemDto);
        CartItem savedCartItem = cartItemService.save(cartItemEntity);
        CartItemDto dto = cartItemConverter.toDto(savedCartItem);
        return ResponseEntity.ok(dto);

    }

    @GetMapping
    public ResponseEntity<List<CartItemDto>> findAll() {
        List<CartItem> cartItems = cartItemService.findAll();
        List<CartItemDto> cartItemDtos = cartItemConverter.toDtos(cartItems);
        return ResponseEntity.ok(cartItemDtos);
    }

    @DeleteMapping("id/{id}")
    public ResponseEntity<Long> deleteById(@PathVariable Long id) {
        cartItemService.deleteById(id);
        return ResponseEntity.ok(id);

    }

    @PutMapping("id/{id}")
    public ResponseEntity<CartItemDto> update(@PathVariable Long id, @RequestBody CartItemDto cartItemDto) {
        CartItem cartItemEntity = cartItemConverter.toEntity(cartItemDto);
        CartItem savedCartItem = cartItemService.update(id, cartItemEntity);
        CartItemDto dto = cartItemConverter.toDto(savedCartItem);
        return ResponseEntity.ok(dto);
    }

    @PostMapping("userId/{userId}/productId/{productId}")
    public ResponseEntity<CartItemDto> addCartItemToCart(@PathVariable Long userId, @PathVariable Long productId, @RequestParam int quantity) {
        CartItem cartItem = cartItemService.addCartItemToCart(userId, productId, quantity);
        CartItemDto dto = cartItemConverter.toDto(cartItem);
        return ResponseEntity.ok(dto);

    }
    @PutMapping("update/cartItemId/{id}")
    public ResponseEntity<CartItemDto> updateCartItemQuantity(@PathVariable Long id ,
                                                              @RequestParam int quantity) {
        CartItem cartItem = cartItemService.updateCartItemQuantity(id, quantity);
        CartItemDto dto = cartItemConverter.toDto(cartItem);
        return ResponseEntity.ok(dto);
    }

}
