package com.backend.domain.member;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Member {
    private Integer number;
    private Integer id;
    private String email;
    private String password;
    private String nickName;
    private LocalDateTime inserted;
}
