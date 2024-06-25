package com.backend.service.theater.box;

import com.backend.domain.movie.Movie;
import com.backend.domain.theater.box.TheaterBox;
import com.backend.domain.theater.box.TheaterBoxMovie;
import com.backend.mapper.book.BookMapper;
import com.backend.mapper.movie.MovieMapper;
import com.backend.mapper.theater.TheaterMapper;
import com.backend.mapper.theater.box.TheaterBoxMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
            theaterBoxMovie.setStartDate(movieMapper.selectByMovieId(theaterBoxMovie.getMovieId()).getStartDate());
        }

        return theaterBoxMovieList;
    }


    public TheaterBox getTheaterBox(Integer theaterBoxId) {
        TheaterBox theaterBox = theaterBoxMapper.selectTheaterBox(theaterBoxId);
        List<TheaterBoxMovie> theaterBoxMovieList = bookMapper.selectTheaterBoxTimeTableByTheaterBoxId(theaterBoxId);

        theaterBox.setTheaterBoxMovieList(theaterBoxMovieList);
        return theaterBox;
    }

    public List<TheaterBox> getOnscreenListByDateAndTheaterNumberAndMovieId(String date, Integer theaterNumber, Integer movieId) {
        List<TheaterBox> theaterBoxList = theaterBoxMapper.selectAllTheaterBoxByTheaterNumber(theaterNumber);
        LocalDate selectedDate = LocalDate.parse(date);
        System.out.println("selectedDate = " + selectedDate);

        for (TheaterBox theaterBox : theaterBoxList) {
            theaterBox.setMovieIdList(bookMapper.selectAllMovieIdByTheaterNumber(theaterNumber));
            List<TheaterBoxMovie> theaterBoxMovieList = theaterBoxMapper.selectAllTheaterBoxMovieByTheaterBoxId(theaterBox.getId());

            for (TheaterBoxMovie theaterBoxMovie : theaterBoxMovieList) {
                theaterBoxMovie.setMovieTitle(movieMapper.selectByMovieId(theaterBoxMovie.getMovieId()).getTitle());
                theaterBoxMovie.setStartDate(movieMapper.selectByMovieId(theaterBoxMovie.getMovieId()).getStartDate());

                if (movieId == null) {
                    theaterBoxMovie.setBookPlaceTimeList(bookMapper.selectAllBookPlaceTimeByTheaterBoxMovieIdAndDate(theaterBoxMovie.getId(), selectedDate));
                } else {
                    theaterBoxMovie.setBookPlaceTimeList(bookMapper.selectAllBookPlaceTimeByTheaterBoxMovieIdAndDateAndMovieId(theaterBox.getId(), selectedDate, movieId));
                }
            }

            theaterBox.setTheaterBoxMovieList(theaterBoxMovieList);
        }

        return null;
    }

    public ResponseEntity add(TheaterBoxMovie theaterBoxMovie) {
        int count = theaterBoxMapper.checkConflict(theaterBoxMovie);
        if (count > 0) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        boolean result = theaterBoxMapper.insertTheaterBoxMovie(theaterBoxMovie) > 0;
        return result ? ResponseEntity.ok().build() : ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    public List<Movie> getMovieListByTheaterBoxId(Integer theaterBoxId) {
        return theaterBoxMapper.selectAllMovieByTheaterBoxId(theaterBoxId);
    }
}
