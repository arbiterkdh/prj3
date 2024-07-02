package com.backend.domain.store;

import com.backend.domain.book.BookData;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class Payment {
    private Integer id;
    private Boolean success;
    private String orderNumber;
    private String status;
    private Long amount;
    private String buyerName;
    private String buyerEmail;
    private String buyerDate;
    private Integer memberNumber;
    private List<Integer> checkCartId;

    // 예매쪽에만 필요 정보
    private BookData bookData;


    //추가컬럼
    private String name;
    private Integer quantity;
    private Integer totalPrice;
    private Integer price;
    private LocalDateTime orderDate;

    private Integer productId;


    private Object qrCode;
}
