package com.backend.domain.store;

import lombok.Data;

@Data
public class Payment {
    private Boolean success;
    private String orderNumber;
    private String status;
    private Integer amount;
    private String buyerName;
    private String buyerEmail;
}
