package com.backend.domain.promotion;

import lombok.Data;

import java.util.Date;

@Data
public class Promotion {
    private Integer id;
    private String title;
    private String eventType;
    private Date eventStartDate;
    private Date eventEndDate;
    private String content;
}
