package com.backend.domain.store;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Product {
    private Integer id;
    private String name;
    private String content;
    private Integer price;
    private Integer stock;
    private String fileName;
    private Integer quantity;
    private LocalDateTime regDate;
    private String type;
    private ProductImage image;

    private Integer rank;
    private String menuType;
}
