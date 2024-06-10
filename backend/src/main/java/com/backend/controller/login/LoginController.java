package com.backend.controller.login;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/oauth")
@RequiredArgsConstructor
public class LoginController {

//    private final MemberService memberService;

//    @GetMapping("kakao/callback")
//    public ResponseEntity kakaoCallback(@RequestParam String code) {
//        return ResponseEntity.ok().build();
//    }
//
//    @PostMapping("oauth/token")
//    public ResponseEntity kakaoInfo(@RequestBody KakaoLogin kakaoLogin) {
//        Map<String, Object> map = memberService.getKakaoToken(kakaoLogin);
//        if (map != null) {
//        return ResponseEntity.ok(kakaoLogin);
//        }
//        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//    }
}
