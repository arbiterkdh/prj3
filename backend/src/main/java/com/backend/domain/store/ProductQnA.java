package com.backend.domain.store;

import lombok.Data;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
public class ProductQnA {

    private Integer id;
    private String writer;
    private String title;
    private String content;
    private Integer productId;
    private LocalDateTime regDate;

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
