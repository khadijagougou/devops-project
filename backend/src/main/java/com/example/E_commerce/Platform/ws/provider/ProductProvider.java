package com.example.E_commerce.Platform.ws.provider;

import com.example.E_commerce.Platform.entities.Product;
import com.example.E_commerce.Platform.services.facade.ProductService;
import com.example.E_commerce.Platform.services.facade.StorageService;
import com.example.E_commerce.Platform.ws.converter.ProductConverter;
import com.example.E_commerce.Platform.ws.dto.ProductDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tools.jackson.databind.ObjectMapper;

import java.util.List;

@RestController
@RequestMapping("api/product")
public class ProductProvider {
    @Autowired
    private ProductService productService;
    @Autowired
    private ProductConverter productConverter;
    @Autowired
    private StorageService storageService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductDto> save(
            @RequestPart("product") String productJson,
            @RequestPart(value = "file", required = false) MultipartFile file
    ) {
        try {
            ObjectMapper mapper = new ObjectMapper();

            ProductDto productDto = mapper.readValue(productJson, ProductDto.class);

            Product product = productConverter.toEntity(productDto);

            Product saved = productService.save(product, file);

            ProductDto savedDto = productConverter.toDto(saved);

            return ResponseEntity.ok(savedDto);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<ProductDto>> findAll() {
        List<Product> products = productService.findAll();
        List<ProductDto> productDtos = productConverter.toDtos(products);
        return ResponseEntity.ok(productDtos);
    }

    @PutMapping(value = "id/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductDto> update(
            @PathVariable Long id,
            @RequestPart("product") String productJson,
            @RequestPart(value = "file", required = false) MultipartFile file
    ) {
        try {
            ObjectMapper mapper = new ObjectMapper();

            ProductDto productDto = mapper.readValue(productJson, ProductDto.class);

            Product product = productConverter.toEntity(productDto);

            Product updated = productService.update(id, product, file);

            ProductDto updatedDto = productConverter.toDto(updated);

            return ResponseEntity.ok(updatedDto);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("id/{id}")
    public ResponseEntity<Long> deleteById(@PathVariable Long id) {
        productService.deleteById(id);
        return ResponseEntity.ok(id);
    }

    @GetMapping("category/{id}")
    public ResponseEntity<List<ProductDto>> findAllByCategoryId(@PathVariable Long categoryId) {
        List<Product> productsByCategoryId = productService.findByCategoryId(categoryId);
        List<ProductDto> productDtos = productConverter.toDtos(productsByCategoryId);
        return ResponseEntity.ok(productDtos);
    }
    @GetMapping("id/{id}")
    public ResponseEntity<ProductDto> findById(@PathVariable Long id) {
        Product product = productService.findById(id);
        ProductDto productDto = productConverter.toDto(product);
        return ResponseEntity.ok(productDto);
    }

}
