package com.example.E_commerce.Platform.repositories;

import com.example.E_commerce.Platform.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository  extends JpaRepository<Product,Long> {
    public List<Product> findByCategoryId(Long categoryId);
}
