package com.backend.service.book.seat;

import com.backend.domain.book.BookPlaceTime;
import com.backend.domain.book.seat.BookSeat;
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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class BookSeatService {

    @Value("${aws.s3.bucket.name}")
    String bucketName;

    @Value("${image.src.prefix}")
    String srcPrefix;

    private final BookMapper bookMapper;
    private final BookSeatMapper bookSeatMapper;
    private final TheaterBoxMapper theaterBoxMapper;
    private final TheaterMapper theaterMapper;
    private final MovieMapper movieMapper;

    public Map<String, Object> getDataByBookPlaceTimeId(Integer bookPlaceTimeId) {
        Map<String, Object> data = new HashMap<>();

        List<String> rowColList = bookSeatMapper.selectAllRowColByBookPlaceTimeId(bookPlaceTimeId);
        BookPlaceTime bookPlaceTime = bookMapper.selectBookPlaceTime(bookPlaceTimeId);
        TheaterBoxMovie theaterBoxMovie = theaterBoxMapper.selectTheaterBoxMovieByBookPlaceTimeId(bookPlaceTimeId);
        TheaterBox theaterBox = theaterBoxMapper.selectTheaterBoxByTheaterBoxMovieId(theaterBoxMovie.getId());
        Theater theater = theaterMapper.selectTheaterByTheaterNumber(theaterBox.getTheaterNumber());
        Movie movie = movieMapper.selectByMovieId(theaterBoxMovie.getMovieId());
        String file = STR."\{srcPrefix}/movie/\{movie.getId()}/\{movieMapper.selectFileNameByMovieId(movie.getId())}";
        movie.setMovieImageFile(file);

        data.put("rowColList", rowColList);
        data.put("bookPlaceTime", bookPlaceTime);
        data.put("theaterBoxMovie", theaterBoxMovie);
        data.put("theaterBox", theaterBox);
        data.put("theater", theater);
        data.put("movie", movie);

        return data;
    }

    public BookSeat getBookSeat(BookPlaceTime bookPlaceTime, String rowCol) {
        return bookSeatMapper.selectBookSeat(bookPlaceTime.getBookPlaceTimeId(), rowCol);
    }

    public List<String> getRowColList(BookPlaceTime bookPlaceTime) {
        return bookSeatMapper.selectAllRowColByBookPlaceTimeId(bookPlaceTime.getBookPlaceTimeId());
    }

    public void addBookSeat(BookPlaceTime bookPlaceTime, String rowCol) {
        bookSeatMapper.insertBookSeat(bookPlaceTime.getBookPlaceTimeId(), rowCol);
    }
}
