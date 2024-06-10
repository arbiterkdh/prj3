package com.backend.domain.login;

import lombok.Data;

@Data
public class KakaoLogin {
    private String tokenType;
    private String accessToken;
    private String idToken;
    private String refreshToken;
    private String scope;
    private Integer expiresIn;
    private Integer refreshTokenExpiresIn;
}
