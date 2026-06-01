package com.example.E_commerce.Platform.ws.provider;

import com.example.E_commerce.Platform.entities.Category;
import com.example.E_commerce.Platform.services.facade.CategoryService;
import com.example.E_commerce.Platform.ws.converter.CategoryConverter;
import com.example.E_commerce.Platform.ws.dto.CategoryDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/category")
public class CategoryProvider {
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private CategoryConverter categoryConverter;

    @PostMapping
    public ResponseEntity<CategoryDto> save(@RequestBody CategoryDto categoryDto) {
        Category category = categoryConverter.toEntity(categoryDto);
        Category savedCategory = categoryService.save(category);
        CategoryDto dtoCategory = categoryConverter.toDto(savedCategory);
        return ResponseEntity.ok(dtoCategory);
    }

    @DeleteMapping("id/{id}")
    public ResponseEntity<Long> deleteById(@PathVariable Long id) {
        categoryService.deleteById(id);
        return ResponseEntity.ok(id);
    }

    @GetMapping
    public ResponseEntity<List<CategoryDto>> findAll() {
        List<Category> categories = categoryService.findAll();
        List<CategoryDto> dtoList = categoryConverter.toDtoList(categories);
        return ResponseEntity.ok(dtoList);
    }
    @PutMapping("id/{id}")
    public ResponseEntity<CategoryDto> update(@PathVariable Long id ,@RequestBody CategoryDto categoryDto) {
        Category category = categoryConverter.toEntity(categoryDto);
        Category savedCategory = categoryService.update(id,category);
        CategoryDto dtoCategory = categoryConverter.toDto(savedCategory);
        return ResponseEntity.ok(dtoCategory);
    }
    @GetMapping("{id}")
    public ResponseEntity<CategoryDto> findById(@PathVariable Long id) {
        Category category = categoryService.findById(id);
        CategoryDto dtoCategory = categoryConverter.toDto(category);
        return ResponseEntity.ok(dtoCategory);
    }

}
