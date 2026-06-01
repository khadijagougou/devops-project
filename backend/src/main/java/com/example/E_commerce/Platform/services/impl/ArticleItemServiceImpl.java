package com.example.E_commerce.Platform.services.impl;

import com.example.E_commerce.Platform.entities.ArticleItem;
import com.example.E_commerce.Platform.repositories.ArticleItemRepository;
import com.example.E_commerce.Platform.services.facade.ArticleItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArticleItemServiceImpl implements ArticleItemService {
    @Autowired
    private ArticleItemRepository articleItemRepository;

    @Override
    public ArticleItem save(ArticleItem articleItem) {
        return articleItemRepository.save(articleItem);
    }

    @Override
    public void deleteById(Long id) {
        articleItemRepository.deleteById(id);
    }

    @Override
    public ArticleItem findById(Long id) {
        return articleItemRepository.findById(id).orElse(null);
    }

    @Override
    public List<ArticleItem> findAll() {
        return articleItemRepository.findAll();
    }

    @Override
    public ArticleItem update(Long id, ArticleItem newArticleItem) {
        ArticleItem oldArticleItem = findById(id);
        oldArticleItem.setProduct(newArticleItem.getProduct());
        oldArticleItem.setQuantity(newArticleItem.getQuantity());
        oldArticleItem.setUnitPrice(newArticleItem.getUnitPrice());
        return articleItemRepository.save(oldArticleItem);
    }
}
