package com.example.E_commerce.Platform.ws.converter;

import com.example.E_commerce.Platform.entities.Category;
import com.example.E_commerce.Platform.entities.Product;
import com.example.E_commerce.Platform.services.facade.CategoryService;
import com.example.E_commerce.Platform.ws.dto.ProductDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ProductConverter {
    @Autowired
    private CategoryService categoryService;

    public ProductDto toDto(Product product) {
        ProductDto productDto = new ProductDto();
        productDto.setId(product.getId());
        productDto.setName(product.getName());
        productDto.setDescription(product.getDescription());
        productDto.setPrice(product.getPrice());
        productDto.setQuantity(product.getQuantity());
        productDto.setCategoryId(product.getCategory().getId());
        productDto.setFileName(product.getFileName());
        return productDto;
    }

    public Product toEntity(ProductDto productDto) {
        Product product = new Product();
        product.setId(productDto.getId());
        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());
        product.setPrice(productDto.getPrice());
        product.setQuantity(productDto.getQuantity());
        Category category = categoryService.findById(productDto.getCategoryId());
        product.setCategory(category);
        product.setFileName(productDto.getFileName());
        return product;
    }

    public List<ProductDto> toDtos(List<Product> products) {
        if (products == null) return null;
        return products.stream().map(this::toDto).collect(Collectors.toList());
    }

    public List<Product> toEntities(List<ProductDto> productDtos) {
        if (productDtos == null) return null;
        return productDtos.stream().map(this::toEntity).collect(Collectors.toList());
    }

}
