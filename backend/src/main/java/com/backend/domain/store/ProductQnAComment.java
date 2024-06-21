package com.backend.domain.store;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ProductQnAComment {

    private Integer id;
    private String content;
    private LocalDateTime regDate;
    private Integer productQnAId;
}
