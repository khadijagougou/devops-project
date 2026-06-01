package com.example.E_commerce.Platform.repositories;

import com.example.E_commerce.Platform.entities.ArticleItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleItemRepository extends JpaRepository<ArticleItem,Long> {
    List<ArticleItem> findByProductId(Long productId);
}
