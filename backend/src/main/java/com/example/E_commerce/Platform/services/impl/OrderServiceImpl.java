package com.example.E_commerce.Platform.services.impl;

import com.example.E_commerce.Platform.entities.*;
import com.example.E_commerce.Platform.enums.CouponType;
import com.example.E_commerce.Platform.enums.OrderStatus;
import com.example.E_commerce.Platform.enums.PaymentStatus;
import com.example.E_commerce.Platform.repositories.OrderRepository;
import com.example.E_commerce.Platform.services.facade.CartService;
import com.example.E_commerce.Platform.services.facade.OrderService;
import com.example.E_commerce.Platform.services.facade.UserService;
import com.example.E_commerce.Platform.ws.dto.OrderDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private CartService cartService;
    @Autowired
    private UserService userService;

    @Override
    @Transactional
    public Order save(Order order) {

        // ================= COUPON CHECK =================
        if (order.getCoupon() != null) {

            if (order.getCoupon().getExpirationDate().isBefore(LocalDate.now())
                    || !order.getCoupon().isActive()) {
                throw new RuntimeException("Coupon invalide ou expiré");
            }
        } else {
            order.setCoupon(null);
        }

        // ================= LINK ITEMS =================
        if (order.getOrderItems() != null) {
            for (OrderItem item : order.getOrderItems()) {
                item.setOrder(order);
            }
        }

        // ================= UPDATE STOCK =================
        for (OrderItem item : order.getOrderItems()) {

            Product product = item.getProduct();

            if (product.getQuantity() < item.getQuantity()) {
                throw new RuntimeException("Stock insuffisant pour " + product.getName());
            }

            product.setQuantity(product.getQuantity() - item.getQuantity());
        }

        order.setPaymentStatus(PaymentStatus.PAID);

        // ================= SAVE ORDER =================
        Order savedOrder = orderRepository.save(order);

        // ================= CLEAR CART =================
        Cart cart = cartService.findByUserId(order.getUser().getId());
        cartService.clearCart(cart.getId());

        return savedOrder;
    }
    public void deleteById(Long id) {
        orderRepository.deleteById(id);
    }

    @Override
    public Order findById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }

    @Override
    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    @Override
    public Order update(Long id, Order newOrder) {
        Order oldOrder = findById(id);
        oldOrder.setOrderItems(newOrder.getOrderItems());
        oldOrder.setUser(oldOrder.getUser());
        return orderRepository.save(oldOrder);
    }

    @Override
    public List<Order> findByUserId(Long userId) {
        return  orderRepository.findByUserId(userId);
    }
    @Override
    public Order updateStatus(Long idOrder, OrderStatus status) {
        Order order = orderRepository.findById(idOrder)
                .orElseThrow(() -> new RuntimeException("Order introuvable"));

        if (order.getUser() == null) {
            throw new RuntimeException("Utilisateur manquant pour cette commande");
        }

        order.setOrderStatus(status);
        return orderRepository.save(order);
    }
}
