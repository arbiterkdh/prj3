package com.backend.service.login;

import com.backend.domain.member.Member;
import com.backend.domain.social_login.kakao.KakaoMember;
import com.backend.domain.social_login.kakao.KakaoOauth;
import com.backend.mapper.member.MemberMapper;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class LoginService {

    @Value("${kakao.rest.api.key}")
    String REST_API_KEY;

    @Value("${kakao.redirect.uri}")
    String REDIRECT_URI;

    String KAKAO_TOKEN_URI = "https://kauth.kakao.com/oauth/token";

    private final MemberMapper memberMapper;


    public KakaoOauth getKakaoAccessToken(String code) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", REST_API_KEY);
        params.add("redirect_uri", REDIRECT_URI);
        params.add("code", code);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        // 카카오로부터 Access Token 받아오기
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> accessTokenResponse = restTemplate.exchange(
                KAKAO_TOKEN_URI,
                HttpMethod.POST,
                request,
                String.class
        );

        // JSON Parsing -> KakaoOauth
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        KakaoOauth kakaoOauth = null;
        try {
            kakaoOauth = objectMapper.readValue(accessTokenResponse.getBody(), KakaoOauth.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return kakaoOauth;
    }

    public ResponseEntity<KakaoMember> kakaoLogin(KakaoOauth accessToken) {
        Member member = null;

        KakaoMember kakaoMember = new KakaoMember();
        kakaoMember.setLoginSuccess(true);
        kakaoMember.setMember(member);

        Member existMember = memberMapper.selectByEmail(member.getEmail());

        return null;
    }
}
