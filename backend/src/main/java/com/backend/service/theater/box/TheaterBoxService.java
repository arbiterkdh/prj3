package com.backend.service.theater.box;

import com.backend.domain.theater.box.TheaterBox;
import com.backend.domain.theater.box.TheaterBoxMovie;
import com.backend.mapper.movie.MovieMapper;
import com.backend.mapper.theater.box.TheaterBoxMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class TheaterBoxService {

    private final TheaterBoxMapper theaterBoxMapper;
    private final MovieMapper movieMapper;

    public List<TheaterBox> getTheaterBoxList(Integer theaterNumber) {
        return theaterBoxMapper.selectAllTheaterBoxByTheaterNumber(theaterNumber);
    }

    public List<TheaterBoxMovie> getTheaterBoxMovieList(Integer theaterBoxId) {
        List<TheaterBoxMovie> theaterBoxMovieList = theaterBoxMapper.selectAllTheaterBoxMovieByTheaterBoxId(theaterBoxId);
        for (TheaterBoxMovie theaterBoxMovie : theaterBoxMovieList) {
            theaterBoxMovie.setMovieTitle(movieMapper.selectByMovieId(theaterBoxMovie.getMovieId()).getTitle());
            // 프론트에서 출력할 때 써먹게 영화 id 로 제목 추출해서 집어넣기.
        }

        return theaterBoxMovieList;
    }


    public TheaterBox getTheaterBox(Integer theaterBoxId) {
        return theaterBoxMapper.selectTheaterBox(theaterBoxId);
    }
}
