package com.backend.service.book.seat;

import com.backend.domain.book.BookPlaceTime;
import com.backend.domain.movie.Movie;
import com.backend.domain.theater.Theater;
import com.backend.domain.theater.box.TheaterBox;
import com.backend.domain.theater.box.TheaterBoxMovie;
import com.backend.mapper.book.BookMapper;
import com.backend.mapper.book.seat.BookSeatMapper;
import com.backend.mapper.movie.MovieMapper;
import com.backend.mapper.theater.TheaterMapper;
import com.backend.mapper.theater.box.TheaterBoxMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class BookSeatService {

    private final BookMapper bookMapper;
    private final BookSeatMapper bookSeatMapper;
    private final TheaterBoxMapper theaterBoxMapper;
    private final TheaterMapper theaterMapper;
    private final MovieMapper movieMapper;

    public Map<String, Object> getDataByBookPlaceTimeId(Integer bookPlaceTimeId) {
        Map<String, Object> data = new HashMap<>();

        BookPlaceTime bookPlaceTime = bookMapper.selectBookPlaceTime(bookPlaceTimeId);
        TheaterBoxMovie theaterBoxMovie = theaterBoxMapper.selectTheaterBoxMovieByBookPlaceTimeId(bookPlaceTimeId);
        TheaterBox theaterBox = theaterBoxMapper.selectTheaterBoxByTheaterBoxMovieId(theaterBoxMovie.getId());
        Theater theater = theaterMapper.selectTheaterByTheaterNumber(theaterBox.getTheaterNumber());
        Movie movie = movieMapper.selectByMovieId(theaterBoxMovie.getMovieId());

        data.put("bookPlaceTime", bookPlaceTime);
        data.put("theaterBoxMovie", theaterBoxMovie);
        data.put("theaterBox", theaterBox);
        data.put("theater", theater);
        data.put("movie", movie);

        // 뭐가 필요할 지 감이 잘 안와서 일단 다 집어넣음.

        return data;
    }
}
