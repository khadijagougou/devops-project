package com.example.E_commerce.Platform.services.impl;

import com.example.E_commerce.Platform.entities.Category;
import com.example.E_commerce.Platform.entities.Product;
import com.example.E_commerce.Platform.repositories.CategoryRepository;
import com.example.E_commerce.Platform.repositories.ProductRepository;
import com.example.E_commerce.Platform.services.facade.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private ProductRepository productRepository;
    @Override
    public Category save(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public void deleteById(Long id) {

        categoryRepository.deleteById(id);
    }

    @Override
    public Category findById(Long id) {
        return categoryRepository.findById(id).orElse(null);
    }

    @Override
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    @Override
    public Category update(Long id, Category newCategory) {
        Category oldCategory = findById(id);

        oldCategory.setName(newCategory.getName());
        return categoryRepository.save(oldCategory);
    }
}
