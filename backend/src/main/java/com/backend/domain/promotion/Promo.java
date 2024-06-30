package com.backend.domain.promotion;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class Promo {
    private Integer id;
    private String title;
    private String eventType;
    private LocalDate eventStartDate;
    private LocalDate eventEndDate;
    private String content;
    private Boolean isRecommended;
    private List<PromoFile> fileList;
    private String eventStatus;
}
