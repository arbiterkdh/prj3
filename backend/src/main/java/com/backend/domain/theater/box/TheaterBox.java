package com.backend.domain.theater.box;

import lombok.Data;

@Data
public class TheaterBox {
    private Integer id;
    private Integer boxNumber;
    private Integer theaterNumber;

    // theater 테이블 조인용
    private String theaterLocation;
    private String movieId;
    private String movieTitle;
}
