package com.backend.controller.login;

import com.backend.domain.social_login.kakao.KakaoMember;
import com.backend.domain.social_login.kakao.KakaoOauth;
import com.backend.service.login.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/oauth")
@RequiredArgsConstructor
public class LoginController {

    private final LoginService loginService;

    @GetMapping("kakao/callback")
    public ResponseEntity<KakaoMember> kakaoCallback(@RequestParam String code) {
        KakaoOauth accessToken = loginService.getKakaoAccessToken(code);

        return loginService.kakaoLogin(accessToken);
    }

}

