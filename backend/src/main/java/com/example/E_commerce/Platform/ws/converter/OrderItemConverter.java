package com.example.E_commerce.Platform.ws.converter;

import com.example.E_commerce.Platform.entities.OrderItem;
import com.example.E_commerce.Platform.services.facade.OrderService;
import com.example.E_commerce.Platform.services.facade.ProductService;
import com.example.E_commerce.Platform.ws.dto.OrderItemDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class OrderItemConverter {
    @Autowired
    private ProductService productService;
    @Autowired
    private OrderService orderService;

    public OrderItemDto toDto(OrderItem orderItem) {
        OrderItemDto orderItemDto = new OrderItemDto();
        orderItemDto.setId(orderItem.getId());
        orderItemDto.setQuantity(orderItem.getQuantity());
        orderItemDto.setUnitPrice(orderItem.getUnitPrice());
        orderItemDto.setProductId(orderItem.getProduct().getId());
        return orderItemDto;
    }

    public OrderItem toEntity(OrderItemDto orderItemDto) {
        OrderItem orderItem = new OrderItem();

        orderItem.setId(orderItemDto.getId());
        orderItem.setQuantity(orderItemDto.getQuantity());
        orderItem.setUnitPrice(orderItemDto.getUnitPrice());
        orderItem.setProduct(productService.findById(orderItemDto.getProductId()));

        return orderItem;
    }

    public List<OrderItemDto> toDtos(List<OrderItem> orderItems) {
        if (orderItems == null) return null;
        return orderItems.stream().map(this::toDto).collect(Collectors.toList());
    }

    public List<OrderItem> toEntities(List<OrderItemDto> orderItemDtos) {
        if (orderItemDtos == null) return null;
        return orderItemDtos.stream().map(this::toEntity).collect(Collectors.toList());
    }

}
