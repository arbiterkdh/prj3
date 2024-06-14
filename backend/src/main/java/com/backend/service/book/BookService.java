package com.backend.service.book;

import com.backend.domain.book.MovieLocation;
import com.backend.domain.movie.Movie;
import com.backend.mapper.book.BookMapper;
import com.backend.mapper.movie.MovieMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class BookService {
    private final BookMapper bookMapper;
    private final MovieMapper movieMapper;

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

    public List<Map<String, Object>> getOnScreenList() {
        List<Map<String, Object>> mapList = bookMapper.selectAllOnScreenByDate();
        return getMaps(mapList);
    }

    public List<Map<String, Object>> getWillScreenList() {
        List<Map<String, Object>> mapList = bookMapper.selectAllWillScreenByDate();
        return getMaps(mapList);
    }

    private List<Map<String, Object>> getMaps(List<Map<String, Object>> mapList) {
        List<Map<String, Object>> screenList = new ArrayList<>();
        for (Map<String, Object> map : mapList) {
            map.put("theater_number", bookMapper.selectAllTheaterNumberByMovieId((Integer) map.get("id")));
            screenList.add(map);
        }
        return screenList;
    }

    public Integer getDayOfOneWeekAgo() {
        return bookMapper.selectDayOfOneWeekAgo();
    }

    public List<LocalDate> getBookPeriodList() {
        return bookMapper.selectAllBookPeriodListByDate();
    }
}
