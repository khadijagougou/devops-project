package com.example.E_commerce.Platform.ws.converter;

import com.example.E_commerce.Platform.entities.Category;
import com.example.E_commerce.Platform.ws.dto.CategoryDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CategoryConverter {
    @Autowired
    private ProductConverter productConverter;
    public CategoryDto toDto(Category category){
        CategoryDto categoryDto = new CategoryDto();
        categoryDto.setId(category.getId());
        categoryDto.setName(category.getName());
        return categoryDto;
    }
    public Category toEntity(CategoryDto categoryDto){
        Category category = new Category();
        category.setId(categoryDto.getId());
        category.setName(categoryDto.getName());
        return category;
    }
    public List<CategoryDto> toDtoList(List<Category> categoryList){
        if (categoryList == null || categoryList.isEmpty()) return null;
        return categoryList.stream().map(this::toDto).collect(Collectors.toList());
    }
    public List<Category> toEntityList(List<CategoryDto> categoryDtoList){
        if (categoryDtoList == null || categoryDtoList.isEmpty()) return null;
        return categoryDtoList.stream().map(this::toEntity).collect(Collectors.toList());
    }
}
