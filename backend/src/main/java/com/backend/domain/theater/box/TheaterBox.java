package com.backend.domain.theater.box;

import lombok.Data;

import java.util.List;

@Data
public class TheaterBox {
    private Integer id;
    private Integer boxNumber;
    private Integer theaterNumber;

    // 테이블 조인용
    private String theaterLocation;
    private List<TheaterBoxTimeTable> theaterTimeTableList;
}
