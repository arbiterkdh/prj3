package com.backend.domain.store;


import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ProductComment {

    private Integer id;
    private String writer;
    private String content;
    private Integer productId;
    private LocalDateTime regDate;
}
