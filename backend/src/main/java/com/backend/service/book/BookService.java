package com.backend.service.book;

import com.backend.domain.book.MovieLocation;
import com.backend.domain.movie.Movie;
import com.backend.domain.theater.box.TheaterBox;
import com.backend.domain.theater.box.TheaterBoxMovie;
import com.backend.mapper.book.BookMapper;
import com.backend.mapper.movie.MovieMapper;
import com.backend.mapper.theater.TheaterMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class BookService {
    private final BookMapper bookMapper;
    private final MovieMapper movieMapper;
    private final TheaterMapper theaterMapper;

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

    public List<Integer> getMovieIdByTheaterNumber(Integer number) {

        return bookMapper.selectMovieIdByTheaterNumber(number);
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
            List<Integer> theaterNumberList = null;
            theaterNumberList = bookMapper.selectAllTheaterNumberByMovieId((Integer) map.get("id"));

            if (theaterNumberList != null) {
                Map<String, Object> theaterList = new HashMap<>();

                for (Integer theaterNumber : theaterNumberList) {
                    List<TheaterBox> theaterBoxList = theaterMapper.selectTheaterBoxByTheaterNumber(theaterNumber);

                    for (TheaterBox theaterBox : theaterBoxList) {
                        List<TheaterBoxMovie> theaterBoxMovieList = theaterMapper.selectTheaterBoxMovieByTheaterBoxId(theaterBox.getId());

                        for (TheaterBoxMovie theaterBoxMovie : theaterBoxMovieList) {
                            theaterBoxMovie.setBookPlaceTimeList(bookMapper.selectAllBookPlaceTimeByTheaterBoxMovieId(theaterBoxMovie.getId()));
                        }

                        theaterBox.setTheaterBoxMovieList(theaterBoxMovieList);
                    }
                    // 여기까지 오면 theaterBoxList 가 완성된 상태
                    // (각 고유한 관에 -> 상영 영화에 -> 타임 테이블이 들어간 상태)
                    theaterList.put(theaterNumber.toString(), theaterBoxList);
                }
                map.put("theaterList", theaterList);
                // 이렇게 하면 각 movie 를 상영 할 수 있는 각 지점이 들어간 상태
                map.put("theaterNumberList", theaterNumberList);
            }

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
        return bookMapper.selectTheaterBoxTimeTableByTheaterBoxId(theaterBox.getId());
    }

    public List<Movie> getOnScreenList() {
        return bookMapper.selectAllOnscreen();
    }

    public List<Movie> getWillScreenList() {
        return bookMapper.selectAllWillScreen();
    }
}
