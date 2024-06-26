package com.backend.service.book;

import com.backend.domain.book.BookPlaceTime;
import com.backend.domain.book.MovieLocation;
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
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class BookService {
    private final BookMapper bookMapper;
    private final MovieMapper movieMapper;
    private final TheaterMapper theaterMapper;
    private final TheaterBoxMapper theaterBoxMapper;

    public List<Movie> getMovieList() {
        return movieMapper.selectAllMovie();
    }


    public int add(MovieLocation movieLocation) {
        return bookMapper.checkConflict(movieLocation) == 0 ?
                bookMapper.insertMovieLocation(movieLocation) : 0;
    }

    public List<MovieLocation> get() {
        return bookMapper.selectAllMovieLocation();
    }

    public List<Integer> getMovieIdByTheaterNumber(Integer theaterNumber) {

        return bookMapper.selectAllMovieIdByTheaterNumber(theaterNumber);
    }

    public List<Map<String, Object>> getOnScreenList(LocalDate date) {
        List<Map<String, Object>> mapList = bookMapper.selectAllOnScreenByDate(date);
        return getMaps(mapList);
    }

    public List<Map<String, Object>> getWillScreenList(LocalDate date) {
        List<Map<String, Object>> mapList = bookMapper.selectAllWillScreenByDate(date);
        return getMaps(mapList);
    }

    private List<Map<String, Object>> getMaps(List<Map<String, Object>> mapList) {
        List<Map<String, Object>> screenList = new ArrayList<>();

        for (Map<String, Object> map : mapList) {
            List<Integer> theaterNumberList = bookMapper.selectAllTheaterNumberByMovieId((Integer) map.get("id"));

            map.put("theaterNumberList", theaterNumberList);
            screenList.add(map);
        }
        return screenList;
    }

    public Integer getDayOfWeek() {
        return bookMapper.selectDayOfWeek();
    }

    public List<LocalDate> getBookPeriodList() {
        return bookMapper.selectAllBookPeriodListByDate();
    }

    public List<TheaterBox> getTheaterBox(Integer theaterNumber) {
        return bookMapper.selectAllTheaterBoxByTheaterNumber(theaterNumber);
    }

    public List<TheaterBoxMovie> getTheaterBoxTimeTable(TheaterBox theaterBox) {
        List<TheaterBoxMovie> theaterBoxMovieList = bookMapper.selectTheaterBoxTimeTableByTheaterBoxId(theaterBox.getId());

        for (TheaterBoxMovie theaterBoxMovie : theaterBoxMovieList) {
            theaterBoxMovie.setBookPlaceTimeList(bookMapper.selectAllBookPlaceTimeByTheaterBoxMovieId(theaterBoxMovie.getId()));
        }

        return theaterBoxMovieList;
    }

    public List<Movie> getOnScreenList() {
        return bookMapper.selectAllOnscreen();
    }

    public List<Movie> getWillScreenList() {
        return bookMapper.selectAllWillScreen();
    }

    public List<BookPlaceTime> getAllBookPlaceTimeByTheaterBoxMovieId(Integer theaterBoxMovieId) {
        return bookMapper.selectAllBookPlaceTimeByTheaterBoxMovieId(theaterBoxMovieId);
    }

    public boolean checkBookPlaceTimeLeftByTheaterBoxId(Integer theaterBoxId) {
        boolean result = bookMapper.countAllBookPlaceTimeByTheaterBoxId(theaterBoxId) > 0;
        return result;
    }

    public List<Integer> getMovieIdListByTheaterBoxId(Integer theaterBoxId) {
        return bookMapper.selectAllMovieIdByTheaterBoxId(theaterBoxId);
    }

    public Movie getMovie(Integer movieId) {
        return movieMapper.selectByMovieId(movieId);
    }

    public ResponseEntity addBookPlaceTime(Map<String, Object> requestBody) {
        Integer theaterBoxMovieId = (Integer) requestBody.get("theaterBoxMovieId");
        Integer movieId = (Integer) requestBody.get("movieId");
        Integer runningTime = movieMapper.selectByMovieId(movieId).getRunningTime();
        LocalDateTime startTime = LocalDateTime.parse((String) requestBody.get("startTime"), DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm"));
        LocalDateTime endTime = startTime.plusMinutes((int) (Math.ceil(((double) runningTime) / 10) * 10 + 10));
        // 추가하기 전 시간 겹치는 것 체크
        TheaterBox theaterBox = theaterBoxMapper.selectTheaterBoxByTheaterBoxMovieId(theaterBoxMovieId);

        int count = bookMapper.checkTimeConflict(theaterBox.getId(), startTime, endTime);
        if (count > 0) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        int result = bookMapper.addBookPlaceTime(theaterBoxMovieId, movieId, startTime);
        return ResponseEntity.ok().build();
    }

    public List<Integer> getMovieIdListByTheaterNumber(Integer theaterNumber) {
        return bookMapper.selectAllMovieIdByTheaterNumber(theaterNumber);
    }


    public boolean checkTimeByBookPlaceTimeId(Integer bookPlaceTimeId) {
        return bookMapper.compareStartTimeAndCurrentTimeByBookPlaceTimeId(bookPlaceTimeId) > 0;
    }

    public BookPlaceTime getBookPlaceTimeByBookPlaceTimeId(Integer bookPlaceTimeId) {
        return bookMapper.selectBookPlaceTime(bookPlaceTimeId);
    }
}
