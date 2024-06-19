package com.backend.domain.theater.box;

import lombok.Data;

import java.util.List;

@Data
public class TheaterBox {
    private Integer id; // 각 관의 고유 번호
    // ㄴ(극장 지점 번호가 없어도 이걸로 상영관 구분 가능)
    private Integer boxNumber; // 몇 관 번호
    private Integer theaterNumber; // 극장 지점 번호

    // 테이블 조인용
    private String theaterLocation;
    private List<TheaterBoxTimeTable> theaterBoxTimeTableList;
}
