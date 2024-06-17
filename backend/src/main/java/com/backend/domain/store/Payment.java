package com.backend.domain.store;

import lombok.Data;

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
    private List<String> checkCartId;
}
