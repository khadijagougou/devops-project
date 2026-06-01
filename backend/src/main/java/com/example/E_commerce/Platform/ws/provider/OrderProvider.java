package com.example.E_commerce.Platform.ws.provider;

import com.example.E_commerce.Platform.entities.Order;
import com.example.E_commerce.Platform.enums.OrderStatus;
import com.example.E_commerce.Platform.services.facade.OrderService;
import com.example.E_commerce.Platform.ws.converter.OrderConverter;
import com.example.E_commerce.Platform.ws.dto.OrderDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/order")
public class OrderProvider {
    @Autowired
    private OrderService orderService;
    @Autowired
    private OrderConverter orderConverter;

    @PostMapping
    public ResponseEntity<OrderDto> save(@RequestBody OrderDto orderDto) {
        Order orderEntity = orderConverter.toEntity(orderDto);
        Order savedOrder = orderService.save(orderEntity);
        OrderDto dto = orderConverter.toDto(savedOrder);
        return ResponseEntity.ok(dto);

    }

    @GetMapping
    public ResponseEntity<List<OrderDto>> findAll() {
        List<Order> orders = orderService.findAll();
        List<OrderDto> orderDtos = orderConverter.toDtos(orders);
        return ResponseEntity.ok(orderDtos);
    }

    @DeleteMapping("id/{id}")
    public ResponseEntity<Long> deleteById(@PathVariable Long id) {
        orderService.deleteById(id);
        return ResponseEntity.ok(id);

    }

    @PutMapping("id/{id}")
    public ResponseEntity<OrderDto> update(@PathVariable Long id,@RequestBody OrderDto orderDto) {
        Order orderEntity = orderConverter.toEntity(orderDto);
        Order savedOrder = orderService.update(id,orderEntity);
        OrderDto dto = orderConverter.toDto(savedOrder);
        return ResponseEntity.ok(dto);
    }
    @GetMapping("user/id/{id}")
    public ResponseEntity<List<OrderDto>> findByUserId(@PathVariable Long id) {
        List<Order> orderByUserId = orderService.findByUserId(id);
        List<OrderDto> orderDtos = orderConverter.toDtos(orderByUserId);
        return ResponseEntity.ok(orderDtos);
    }
    @PutMapping("{idOrder}/status/{status}")
    public ResponseEntity<OrderDto> updateStatus(@PathVariable Long idOrder,@PathVariable OrderStatus status) throws Exception {
        Order order = orderService.updateStatus(idOrder, status);
        OrderDto dto = orderConverter.toDto(order);
        return ResponseEntity.ok(dto);

    }
}
