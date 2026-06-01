package com.example.E_commerce.Platform.services.impl;

import com.example.E_commerce.Platform.entities.ArticleItem;
import com.example.E_commerce.Platform.entities.Product;
import com.example.E_commerce.Platform.repositories.ArticleItemRepository;
import com.example.E_commerce.Platform.repositories.CartItemRepository;
import com.example.E_commerce.Platform.repositories.OrderItemRepository;
import com.example.E_commerce.Platform.repositories.ProductRepository;
import com.example.E_commerce.Platform.services.facade.CategoryService;
import com.example.E_commerce.Platform.services.facade.ProductService;
import com.example.E_commerce.Platform.services.facade.StorageService;
import com.example.E_commerce.Platform.services.facade.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private StorageService storageService;
    @Autowired
    private ArticleItemRepository articleItemRepository;


    @Override
    public Product save(Product product, MultipartFile file) {

        if (file != null && !file.isEmpty()) {
            String filename = storageService.store(file);
            product.setFileName(filename);
        }
        return productRepository.save(product);
    }

    @Override
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    @Override
    public Product findById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        List<ArticleItem> articleItems = articleItemRepository.findByProductId(id);
        for (ArticleItem articleItem : articleItems) {
            articleItemRepository.deleteById(articleItem.getId());
        }
        productRepository.deleteById(id);
    }

    @Override
    public Product update(Long id, Product newProduct, MultipartFile file) {

        Product product = findById(id);

        product.setName(newProduct.getName());
        product.setPrice(newProduct.getPrice());
        product.setCategory(newProduct.getCategory());
        product.setDescription(newProduct.getDescription());
        product.setQuantity(newProduct.getQuantity());

        if (file != null && !file.isEmpty()) {
            String filename = storageService.store(file);
            product.setFileName(filename);
        }

        return productRepository.save(product);
    }

    @Override
    public List<Product> findByCategoryId(Long categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }
}
