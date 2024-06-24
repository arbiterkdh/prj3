package com.backend.service.theater.box;

import com.backend.domain.theater.box.TheaterBox;
import com.backend.domain.theater.box.TheaterBoxMovie;
import com.backend.mapper.book.BookMapper;
import com.backend.mapper.movie.MovieMapper;
import com.backend.mapper.theater.TheaterMapper;
import com.backend.mapper.theater.box.TheaterBoxMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class TheaterBoxService {

    private final TheaterBoxMapper theaterBoxMapper;
    private final MovieMapper movieMapper;
    private final TheaterMapper theaterMapper;
    private final BookMapper bookMapper;

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

    public List<TheaterBox> getOnscreenListByDateAndTheaterNumberAndMovieId(String date, Integer theaterNumber, Integer movieId) {
        List<TheaterBox> theaterBoxList = theaterBoxMapper.selectAllTheaterBoxByTheaterNumber(theaterNumber);
        LocalDate selectedDate = LocalDate.parse(date);

        for (TheaterBox theaterBox : theaterBoxList) {
            theaterBox.setMovieIdList(bookMapper.selectAllMovieIdByTheaterNumber(theaterNumber));
            List<TheaterBoxMovie> theaterBoxMovieList = theaterBoxMapper.selectAllTheaterBoxMovieByTheaterBoxId(theaterBox.getId());

            for (TheaterBoxMovie theaterBoxMovie : theaterBoxMovieList) {
                theaterBoxMovie.setMovieTitle(movieMapper.selectByMovieId(theaterBoxMovie.getMovieId()).getTitle());
                theaterBoxMovie.setStartDate(movieMapper.selectByMovieId(theaterBoxMovie.getMovieId()).getStartDate());

                if (movieId == null) {
                    theaterBoxMovie.setBookPlaceTimeList(bookMapper.selectAllBookPlaceTimeByTheaterBoxMovieIdAndDate(theaterBoxMovie.getId(), selectedDate));
                }
            }

            theaterBox.setTheaterBoxMovieList(theaterBoxMovieList);
        }

        return null;
    }
}
