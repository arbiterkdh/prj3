package com.backend.domain.theater.box;

import com.backend.domain.movie.Movie;
import lombok.Data;

import java.util.List;

@Data
public class TheaterBox {
    private Integer id; // 각 관의 고유 번호
    // ㄴ(극장 지점 번호가 없어도 이걸로 상영관 구분 가능)
    private Integer boxNumber; // 몇 관 번호
    private Integer theaterNumber; // 극장 지점 번호
    private Integer capacity; // 각 관의 객석 수

    // 테이블 조인용
    private String theaterLocation;
    private List<TheaterBoxMovie> theaterBoxMovieList;

    // 해당 상영관에 남은 타임테이블 조회
    private boolean isBookPlaceTimeLeft;

    // 해당 상영관에서 상영하는 영화 id 목록
    private List<Integer> movieIdList;

    // 해당 상영관에서 상영 가능한 영화 목록
    private List<Movie> movieList;
}
