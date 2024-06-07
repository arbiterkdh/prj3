package com.backend.domain.mail;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Mail {
    // java mail sender
    private String address;
    private String title;
    private String message;

    // 인증번호 확인용
    private Integer verifyNumber;
    private LocalDateTime created;
    private LocalDateTime expires;
}
