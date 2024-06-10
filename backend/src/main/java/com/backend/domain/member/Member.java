package com.backend.domain.member;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Member {
    private Integer number;
    private String email;
    private String password;
    private String nickName;
    private LocalDateTime inserted;

    // 카카오 용
    private String picture;
}
