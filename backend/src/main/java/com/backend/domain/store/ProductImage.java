package com.backend.domain.store;


import lombok.Data;

@Data
public class ProductImage {
    private Integer id;
    private String name;
    private String path;
    private Integer productId;
}
