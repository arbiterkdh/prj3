package com.backend.domain.store;


import lombok.Data;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
public class ProductCart {

    private Integer id;
    private Integer productId;
    private String name;
    private String fileName;
    private Integer quantity;
    private Integer price;
    private LocalDateTime regDate;

    private Integer memberNumber;
    private Integer paymentId;

    private Integer totalPrice;

    private ProductImage image;

    public String getRegDate() {
        LocalDateTime beforeOneDay = LocalDateTime.now().minusDays(1);

        if (regDate.isBefore(beforeOneDay)) {

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            return regDate.format(formatter).toString();
        } else {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss");
            return regDate.format(formatter).toString();
        }


    }
}
