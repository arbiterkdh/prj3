package com.backend.domain.store;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductImage {
    private String name;
    //    private Integer productId;
    private String src;
}
