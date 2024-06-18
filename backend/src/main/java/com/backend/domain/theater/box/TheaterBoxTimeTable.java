package com.backend.domain.theater.box;

import lombok.Data;

@Data
public class TheaterBoxTimeTable {
    private Integer id;
    private Integer movieId;
    private Integer theaterBoxId;
    private Integer timeInterval;

    // movie 테이블 조인용
    private String movieTitle;
}
