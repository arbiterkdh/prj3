package com.backend.controller.login;

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

    private final LoginService service;

    @GetMapping("kakao/callback")
    public ResponseEntity kakaoCallback(@RequestParam String code) {

        return ResponseEntity.ok(service.register(code));
    }
}
