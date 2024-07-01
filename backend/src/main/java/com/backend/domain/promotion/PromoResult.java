package com.backend.domain.promotion;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class PromoResult {
    private Integer id;
    private Integer promotionId;
    private LocalDate announcementDate;
    private List<Winner> winners; // JSON 문자열로 저장된 당첨자 명단
    private String winnersJson; // JSON으로 저장된 문자열 필드 추가
    private String eventType;
    private String eventName;

    @Data
    public static class Winner {
        private String email;
        private String nickName;
    }
}