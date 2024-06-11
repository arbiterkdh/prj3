package com.backend.domain.promotion;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Data
public class Promotion {
    private Integer id;
    private String title;
    private String eventType;
    private LocalDate eventStartDate;
    private LocalDate eventEndDate;
    private String content;

    private MultipartFile[] files;
}
