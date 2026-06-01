package com.example.E_commerce.Platform.ws.converter;

import com.example.E_commerce.Platform.entities.Cart;
import com.example.E_commerce.Platform.services.facade.CartItemService;
import com.example.E_commerce.Platform.services.facade.CartService;
import com.example.E_commerce.Platform.services.facade.UserService;
import com.example.E_commerce.Platform.ws.dto.CartDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CartConverter {
    @Autowired
    private CartItemConverter cartItemConverter;
    @Autowired
    private UserService userService;
    public CartDto toDto(Cart cart) {
        CartDto cartDto = new CartDto();
        cartDto.setId(cart.getId());
        cartDto.setCartItemDtos(cartItemConverter.toDtos(cart.getCartItems()));
        cartDto.setUserId(cart.getUser().getId());
        return cartDto;
    }

    public Cart toEntity(CartDto cartDto) {
        Cart cart = new Cart();
        cart.setId(cartDto.getId());
        cart.setCartItems(cartItemConverter.toEntities(cartDto.getCartItemDtos()));
        cart.setUser(userService.findById(cartDto.getUserId()));
        return cart;
    }

    public List<CartDto> toDtos(List<Cart> carts) {
        if (carts == null) return null;
        return carts.stream().map(this::toDto).collect(Collectors.toList());
    }
    public List<Cart>  toEntities(List<CartDto> cartDtos) {
        if (cartDtos == null) return null;
        return cartDtos.stream().map(this::toEntity).collect(Collectors.toList());
    }

}
