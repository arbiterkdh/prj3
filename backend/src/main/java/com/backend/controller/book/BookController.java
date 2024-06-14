package com.backend.controller.book;

import com.backend.domain.book.MovieLocation;
import com.backend.domain.movie.Movie;
import com.backend.service.book.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/book")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    @GetMapping("onscreenlist")
    public List<Map<String, Object>> getOnScreenList() {

        return bookService.getOnScreenList();
    }

    @GetMapping("willscreenlist")
    public List<Map<String, Object>> getWillScreenList() {

        return bookService.getWillScreenList();
    }

    @GetMapping("list")
    public List<Integer> getMovieListByTheaterNumber(@RequestParam("theaternumber") Integer number) {
        return bookService.getMovieIdByTheaterNumber(number);
    }


    @GetMapping("movie/list")
    public List<Movie> getMovies() {
        return bookService.getMovieList();
    }

    @PostMapping("movielocation/add")
    public ResponseEntity addMovieLocation(@RequestBody MovieLocation movieLocation) {
        if (bookService.add(movieLocation) > 0) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.CONFLICT).build();
    }

    @GetMapping("date")
    public Map<String, Object> getDate() {
        LocalDate today = LocalDate.now();
        Integer dayOfOneWeekAgo = bookService.getDayOfOneWeekAgo();
        String dayOfOneWeekAgoInKorean = switch (dayOfOneWeekAgo) {
            case 1 -> "일";
            case 2 -> "월";
            case 3 -> "화";
            case 4 -> "수";
            case 5 -> "목";
            case 6 -> "금";
            case 7 -> "토";
            default -> "";
        };

        List<LocalDate> bookPeriodList = bookService.getBookPeriodList();

        Map<String, Object> map = new HashMap<>();
        map.put("today", today);
        map.put("dayOfOneWeekAgo", dayOfOneWeekAgo);
        map.put("dayOfOneWeekAgoInKorean", dayOfOneWeekAgoInKorean);
        map.put("bookPeriodList", bookPeriodList);

        return map;
    }
}
