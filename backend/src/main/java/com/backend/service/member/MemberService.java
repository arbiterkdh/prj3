package com.backend.service.member;

import com.backend.domain.member.Member;
import com.backend.domain.store.PaymentCancel;
import com.backend.domain.store.ProductOrder;
import com.backend.mapper.member.MemberMapper;
import com.backend.mapper.store.PaymentCancelMapper;
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
    private final PaymentCancelMapper paymentCancelMapper;

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
                        .expiresAt(now.plusSeconds(10))
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

    public Map<String, Object> paymentResult(String nickName, Integer page) {

        Integer offset = (page - 1) * 10;

        Map pageInfo = new HashMap();

        Integer totalCount = mapper.totalCount(nickName);
        Integer lastPageNumber = (totalCount - 1) / 10 + 1;
        Integer leftPageNumber = (page - 1) / 10 * 10 + 1;
        Integer rightPageNumber = leftPageNumber + 9;

        rightPageNumber = Math.min(rightPageNumber, lastPageNumber);

        Integer prevPageNumber = leftPageNumber - 1;
        Integer nextPageNumber = rightPageNumber + 1;

        if (prevPageNumber > 0) {
            pageInfo.put("prevPageNumber", prevPageNumber);
        }
        if (nextPageNumber <= lastPageNumber) {
            pageInfo.put("nextPageNumber", nextPageNumber);
        }

        pageInfo.put("totalCount", totalCount);
        pageInfo.put("currentPageNumber", page);
        pageInfo.put("leftPageNumber", leftPageNumber);
        pageInfo.put("rightPageNumber", rightPageNumber);

        return Map.of("paymentResult", mapper.paymentResult(nickName, offset)
                , "pageInfo", pageInfo);
    }

    public List<Member> getAllMembers() {
        return mapper.findAllMembers();
    }

    public Map<String, Object> paymentCancelResult(String nickName, Integer page) {

        Integer offset = (page - 1) * 10;

        Map pageInfo = new HashMap();

        Integer totalCount = paymentCancelMapper.totalCount(nickName);
        Integer lastPageNumber = (totalCount - 1) / 10 + 1;
        Integer leftPageNumber = (page - 1) / 10 * 10 + 1;
        Integer rightPageNumber = leftPageNumber + 9;

        rightPageNumber = Math.min(rightPageNumber, lastPageNumber);

        Integer prevPageNumber = leftPageNumber - 1;
        Integer nextPageNumber = rightPageNumber + 1;

        if (prevPageNumber > 0) {
            pageInfo.put("prevPageNumber", prevPageNumber);
        }
        if (nextPageNumber <= lastPageNumber) {
            pageInfo.put("nextPageNumber", nextPageNumber);
        }

        pageInfo.put("totalCount", totalCount);
        pageInfo.put("currentPageNumber", page);
        pageInfo.put("leftPageNumber", leftPageNumber);
        pageInfo.put("rightPageNumber", rightPageNumber);


        return Map.of("paymentCancelResult", mapper.paymentCancelResult(nickName, offset),
                "pageInfo", pageInfo);
    }

    public List<ProductOrder> paymentOrderItem(Integer paymentId) {

        return mapper.paymentOrderItem(paymentId);
    }

    public List<PaymentCancel> paymentCancelItem(String orderNumber) {

        return mapper.paymentCancelItem(orderNumber);
    }
}
