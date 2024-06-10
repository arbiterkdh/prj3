package com.backend.service.member;

import com.backend.domain.login.KakaoLogin;
import com.backend.domain.member.Member;
import com.backend.mapper.member.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class MemberService {

    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtDecoder jwtDecoder;
    private final JwtEncoder jwtEncoder;
    private final MemberMapper mapper;

    public void add(Member member) {
        member.setPassword(passwordEncoder.encode(member.getPassword()));
        mapper.insert(member);
    }

    public Map<String, Object> getToken(Member member) {
        Map<String, Object> result = null;

        Member db = mapper.selectByEmail(member.getEmail());
        if (db != null) {
            if (passwordEncoder.matches(member.getPassword(), db.getPassword())) {
                result = new HashMap<>();
                String token = "";
                Instant now = Instant.now();

                JwtClaimsSet claims = JwtClaimsSet.builder()
                        .issuer("self")
                        .issuedAt(now)
                        .expiresAt(now.plusSeconds(60 * 60 * 24))
                        .subject(db.getNumber().toString())
                        .claim("nickname", db.getNickName())
                        .build();

                token = jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();

                result.put("token", token);
            }
        }
        return result;
    }

    public boolean hasEmail(String address) {
        return mapper.selectByEmail(address) != null;
    }

    public Member get(String nickName) {
        return mapper.selectByNickName(nickName);
    }

    public Map<String, Object> getKakaoToken(KakaoLogin kakaoLogin) {
        Map<String, Object> kakaoInfo = null;

        try {
            Jwt idToken = jwtDecoder.decode(kakaoLogin.getIdToken());
            String email = idToken.getClaim("email");
            Member db = mapper.selectByEmail(email);

            if (db != null) {
                kakaoInfo = new HashMap<>();
                Instant now = Instant.now();

                JwtClaimsSet.Builder claimsBuilder = JwtClaimsSet.builder()
                        .issuer("https://kauth.kakao.com")
                        .issuedAt(Objects.requireNonNull(idToken.getIssuedAt()))
                        .expiresAt(Objects.requireNonNull(idToken.getExpiresAt()))
                        .subject(idToken.getSubject())
                        .claim("nickName", db.getNickName());

                if (idToken.getClaim("picture") != null) {
                    claimsBuilder.claim("picture", idToken.getClaim("picture").toString());
                }

                JwtClaimsSet claims = claimsBuilder.build();
                String token = jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();

                kakaoInfo.put("token", token);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return kakaoInfo;
    }
}
