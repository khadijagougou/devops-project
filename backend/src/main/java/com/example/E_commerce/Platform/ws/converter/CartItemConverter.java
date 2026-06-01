package com.example.E_commerce.Platform.ws.converter;

import com.example.E_commerce.Platform.entities.CartItem;
import com.example.E_commerce.Platform.services.facade.CartService;
import com.example.E_commerce.Platform.services.facade.ProductService;
import com.example.E_commerce.Platform.ws.dto.CartItemDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CartItemConverter {
    @Autowired
    private ProductService productService;
    @Autowired
    private CartService cartService;
    public CartItemDto toDto(CartItem cartItem) {
        CartItemDto cartItemDto = new CartItemDto();
        cartItemDto.setId(cartItem.getId());
        cartItemDto.setCartId(cartItem.getCart().getId());
        cartItemDto.setQuantity(cartItem.getQuantity());
        cartItemDto.setUnitPrice(cartItem.getUnitPrice());
        cartItemDto.setProductId(cartItem.getProduct().getId());
        return cartItemDto;
    }

    public CartItem toEntity(CartItemDto cartItemDto) {
        CartItem cartItem = new CartItem();
        cartItem.setId(cartItemDto.getId());
        cartItem.setCart(cartService.findById(cartItemDto.getCartId()));
        cartItem.setQuantity(cartItemDto.getQuantity());
        cartItem.setUnitPrice(cartItemDto.getUnitPrice());
        cartItem.setProduct(productService.findById(cartItemDto.getProductId()));
        return cartItem;
    }

    public List<CartItemDto> toDtos(List<CartItem> cartItems) {
        if (cartItems == null) return null;
        return cartItems.stream().map(this::toDto).collect(Collectors.toList());
    }

    public List<CartItem> toEntities(List<CartItemDto> cartItemDtos) {
        if (cartItemDtos == null) return null;
        return cartItemDtos.stream().map(this::toEntity).collect(Collectors.toList());
    }

}
