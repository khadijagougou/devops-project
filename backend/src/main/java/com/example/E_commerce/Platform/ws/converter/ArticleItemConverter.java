package com.example.E_commerce.Platform.ws.converter;


import com.example.E_commerce.Platform.entities.ArticleItem;
import com.example.E_commerce.Platform.ws.dto.ArticleItemDto;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ArticleItemConverter {
    public ArticleItemDto toDto(ArticleItem articleItem) {
        ArticleItemDto articleItemDto = new ArticleItemDto();
        articleItemDto.setId(articleItem.getId());
        articleItemDto.setQuantity(articleItem.getQuantity());
        articleItemDto.setUnitPrice(articleItem.getUnitPrice());
        return articleItemDto;
    }

    public ArticleItem toEntity(ArticleItemDto articleItemDto) {
        ArticleItem articleItem = new ArticleItem();
        articleItem.setId(articleItemDto.getId());
        articleItem.setQuantity(articleItemDto.getQuantity());
        articleItem.setUnitPrice(articleItemDto.getUnitPrice());
        return articleItem;
    }

    public List<ArticleItemDto> toDtos(List<ArticleItem> articleItems) {
        if (articleItems == null) return null;
        return articleItems.stream().map(this::toDto).collect(Collectors.toList());
    }

    public List<ArticleItem> toEntities(List<ArticleItemDto> articleItemDtos) {
        if (articleItemDtos == null) return null;
        return articleItemDtos.stream().map(this::toEntity).collect(Collectors.toList());
    }

}
