package com.example.E_commerce.Platform.ws.provider;

import com.example.E_commerce.Platform.entities.OrderItem;
import com.example.E_commerce.Platform.services.facade.OrderItemService;
import com.example.E_commerce.Platform.ws.converter.OrderItemConverter;
import com.example.E_commerce.Platform.ws.dto.OrderItemDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/order-item")
public class OrderItemProvider {
    @Autowired
    private OrderItemService orderItemService;
    @Autowired
    private OrderItemConverter orderItemConverter;

    @PostMapping
    public ResponseEntity<OrderItemDto> save(@RequestBody OrderItemDto orderItemDto) {
        OrderItem orderItemEntity = orderItemConverter.toEntity(orderItemDto);
        OrderItem savedOrderItem = orderItemService.save(orderItemEntity);
        OrderItemDto dto = orderItemConverter.toDto(savedOrderItem);
        return ResponseEntity.ok(dto);

    }

    @GetMapping
    public ResponseEntity<List<OrderItemDto>> findAll() {
        List<OrderItem> orderItems = orderItemService.findAll();
        List<OrderItemDto> orderItemDtos = orderItemConverter.toDtos(orderItems);
        return ResponseEntity.ok(orderItemDtos);
    }

    @DeleteMapping("id/{id}")
    public ResponseEntity<Long> deleteById(@PathVariable Long id) {
        orderItemService.deleteById(id);
        return ResponseEntity.ok(id);

    }

    @PutMapping("id/{id}")
    public ResponseEntity<OrderItemDto> update(@PathVariable Long id,@RequestBody OrderItemDto orderItemDto) {
        OrderItem orderItemEntity = orderItemConverter.toEntity(orderItemDto);
        OrderItem savedOrderItem = orderItemService.update(id,orderItemEntity);
        OrderItemDto dto = orderItemConverter.toDto(savedOrderItem);
        return ResponseEntity.ok(dto);
    }


}
