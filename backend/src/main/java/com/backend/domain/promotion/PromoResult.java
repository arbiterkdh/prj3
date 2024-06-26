package com.backend.domain.promotion;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class PromoResult {
    private Integer id;
    private Integer promotionId; // promotion 테이블의 id를 참조
    private LocalDate announcementDate;
    private List<Winner> winners; // JSON 문자열로 저장된 당첨자 명단
    private String winnersJson; // JSON으로 저장된 문자열 필드 추가
    private String eventType; // 이벤트 타입
    private String eventName; // 이벤트 이름

    @Data
    public static class Winner {
        private String email;
        private String nickName;
    }
}