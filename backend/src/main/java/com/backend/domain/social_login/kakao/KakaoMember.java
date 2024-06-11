package com.backend.domain.social_login.kakao;

import com.backend.domain.member.Member;
import lombok.Data;

@Data
public class KakaoMember {
    public boolean loginSuccess;
    public Member member;
}
