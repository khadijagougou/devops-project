package com.example.E_commerce.Platform.services.facade;


import com.example.E_commerce.Platform.entities.ArticleItem;

import java.util.List;

public interface ArticleItemService {
    ArticleItem save(ArticleItem articleItem);

    void deleteById(Long id);

    ArticleItem findById(Long id);

    List<ArticleItem> findAll();

    ArticleItem update(Long id, ArticleItem articleItem);
}
