package com.backend.domain.mail;

import lombok.Data;

@Data
public class Mail {
    // java mail sender
    private String address;

    // 인증번호 확인용
    private Integer verifyNumber;
}
