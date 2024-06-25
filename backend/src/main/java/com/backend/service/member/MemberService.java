package com.backend.service.member;

import com.backend.domain.member.Member;
import com.backend.domain.store.Payment;
import com.backend.mapper.member.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class MemberService {

    private final BCryptPasswordEncoder passwordEncoder;
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

                List<String> authority = mapper.selectAuthorityByMemberId(db.getNumber());
                String authorityString = authority.stream()
                        .collect(Collectors.joining(" "));

                JwtClaimsSet claims = JwtClaimsSet.builder()
                        .issuer("self")
                        .issuedAt(now)
                        .expiresAt(now.plusSeconds(60 * 60 * 24))
                        .subject(db.getNumber().toString())
                        .claim("nickName", db.getNickName())
                        .claim("email", db.getEmail())
                        .claim("scope", authorityString)
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

    public void updatePassword(Member member) {

        member.setPassword(passwordEncoder.encode(member.getPassword()));

        mapper.updatePassword(member);
    }

    public List<Payment> paymentResult(String nickName) {

        return mapper.paymentResult(nickName);
    }
}
