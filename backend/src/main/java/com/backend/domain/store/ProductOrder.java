package com.backend.domain.store;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ProductOrder {

    private Integer id;
    private Integer paymentId;
    private String name;
    private String fileName;
    private Integer productId;
    private Integer quantity;
    private Integer price;
    private Integer memberNumber;
    private LocalDateTime regDate;
    private LocalDateTime orderDate;
}
