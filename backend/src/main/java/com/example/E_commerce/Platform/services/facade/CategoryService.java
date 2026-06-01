package com.example.E_commerce.Platform.services.facade;

import com.example.E_commerce.Platform.entities.Category;

import java.util.List;

public interface CategoryService {
    Category save(Category category);

    void deleteById(Long id);

    Category findById(Long id);

    List<Category> findAll();

    Category update(Long id, Category category);
}
