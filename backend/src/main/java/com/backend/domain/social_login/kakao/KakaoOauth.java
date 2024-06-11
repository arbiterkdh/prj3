package com.backend.domain.social_login.kakao;

import lombok.Data;

@Data
public class KakaoOauth {
    private String tokenType;
    private String accessToken;
    private String refreshToken;
    private String scope;
    private Integer expiresIn;
    private Integer refreshTokenExpiresIn;
}
