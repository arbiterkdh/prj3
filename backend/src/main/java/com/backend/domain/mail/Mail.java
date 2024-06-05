package com.backend.domain.mail;

import lombok.Data;

@Data
public class Mail {
    private String address;
    private String title;
    private String message;
}
