package com.backend.domain.social_login.kakao;

import lombok.Data;

@Data
public class KakaoOauth {
    private String token_type;
    private String access_token;
    private String refresh_token;
    private String scope;
    private Integer expires_in;
    private Integer refresh_token_expires_in;
}
