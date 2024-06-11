package com.backend.controller.login;

import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/oauth")
@RequiredArgsConstructor
public class LoginController {

    private final RestTemplate restTemplate;

    @GetMapping("/user-info")
    public ResponseEntity<String> getUserInfo(@RequestHeader("Authorization") String accessToken) {
        System.out.println("Received Access Token: " + accessToken); // 헤더 출력

        try {
            // 토큰 유효성 확인
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", accessToken);
            HttpEntity<String> entity = new HttpEntity<>(headers);

            ResponseEntity<String> tokenInfoResponse = restTemplate.exchange(
                    "https://kapi.kakao.com/v1/user/access_token_info",
                    HttpMethod.GET,
                    entity,
                    String.class
            );

            System.out.println("Token Info Response: " + tokenInfoResponse.getBody());

            // 토큰이 유효한 경우 사용자 정보 요청
            if (tokenInfoResponse.getStatusCode() == HttpStatus.OK) {
                ResponseEntity<String> userInfoResponse = restTemplate.exchange(
                        "https://kapi.kakao.com/v2/user/me",
                        HttpMethod.GET,
                        entity,
                        String.class
                );
                System.out.println("User Info Response: " + userInfoResponse.getBody());
                return ResponseEntity.ok(userInfoResponse.getBody());
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid access token");
            }
        } catch (HttpClientErrorException e) {
            if (e.getStatusCode() == HttpStatus.UNAUTHORIZED) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: Invalid or expired token");
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error verifying token");
        }
    }
}

