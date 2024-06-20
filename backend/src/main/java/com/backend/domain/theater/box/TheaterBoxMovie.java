package com.backend.domain.theater.box;

import com.backend.domain.book.BookPlaceTime;
import lombok.Data;

import java.util.List;

@Data
public class TheaterBoxMovie {
    private Integer id;
    private Integer movieId;
    private Integer theaterBoxId;
    private Integer timeInterval;

    // 테이블 조인용
    private String movieTitle;
    private List<BookPlaceTime> bookPlaceTimeList;
}
