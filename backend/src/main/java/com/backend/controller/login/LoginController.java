package com.backend.controller.login;

import com.backend.domain.login.KakaoLogin;
import com.backend.service.login.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/oauth")
@RequiredArgsConstructor
public class LoginController {

    private final LoginService service;

    @GetMapping("kakao/callback")
    public ResponseEntity kakaoCallback(@RequestParam String code) {
        return ResponseEntity.ok().build();
    }

    @PostMapping("oauth/token")
    public ResponseEntity kakaoInfo(@RequestBody KakaoLogin kakaoLogin) {
        return ResponseEntity.ok(kakaoLogin);
    }
}
