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
    private LocalDateTime regDate;
}