package com.example.E_commerce.Platform.services.facade;

import com.example.E_commerce.Platform.entities.Product;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {

    Product save(Product product, MultipartFile file);

    List<Product> findAll();

    Product findById(Long id);

    void deleteById(Long id);

    Product update(Long id, Product product , MultipartFile file);

    List<Product> findByCategoryId(Long categoryId);
}
