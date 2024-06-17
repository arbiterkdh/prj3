package com.backend.domain.store;

import lombok.Data;

@Data
public class ProductCartOrder {

    private Integer id;
    private Integer cartId;
    private Integer memberNumber;
    private Integer paymentId;
}
