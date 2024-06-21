package com.backend.domain.store;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class Payment {
    private Integer id;
    private Boolean success;
    private String orderNumber;
    private String status;
    private Integer amount;
    private String buyerName;
    private String buyerEmail;
    private String buyerDate;
    private Integer memberNumber;
    private List<Integer> checkCartId;


    //추가컬럼
    private String name;
    private Integer quantity;
    private Integer totalPrice;
    private LocalDateTime orderDate;

    private Integer productId;
}
