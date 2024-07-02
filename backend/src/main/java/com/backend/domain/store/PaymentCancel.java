package com.backend.domain.store;


import lombok.Data;

@Data
public class PaymentCancel {

    private String orderNumber;
    private Integer paymentId;
    private String cancelReason;
    private String requestor;
    private String impUid;
    private Long amount;

    private Long cancelledAt;
    private String receiptUrl;
    private String cardName;
    private String cardNumber;
    private String name;

    private String cancelName;
    private Integer cancelQuantity;
    private Integer cancelPrice;
    private Integer cancelTotalPrice;

    private Integer productId;
}
