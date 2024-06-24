package com.backend.controller.book;

import com.backend.domain.book.MovieLocation;
import com.backend.domain.movie.Movie;
import com.backend.domain.theater.box.TheaterBox;
import com.backend.service.book.BookService;
import com.backend.service.theater.box.TheaterBoxService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/book")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;
    private final TheaterBoxService theaterBoxService;

    @GetMapping("onscreenlist/all")
    public List<Movie> getOnScreenListAll() {
        return bookService.getOnScreenList();
    }

    @GetMapping("willscreenlist/all")
    public List<Movie> getWillScreenListAll() {
        return bookService.getWillScreenList();
    }

    @GetMapping("onscreenlist/{selectedDay}")
    public List<Map<String, Object>> getOnScreenList(@PathVariable String selectedDay) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate date = LocalDate.parse(selectedDay, formatter);

        return bookService.getOnScreenList(date);
    }

    @GetMapping("willscreenlist/{selectedDay}")
    public List<Map<String, Object>> getWillScreenList(@PathVariable String selectedDay) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate date = LocalDate.parse(selectedDay, formatter);

        return bookService.getWillScreenList(date);
    }

    @GetMapping("list")
    public List<Integer> getMovieListByTheaterNumber(@RequestParam("theaternumber") Integer number) {
        return bookService.getMovieIdByTheaterNumber(number);
    }

    @GetMapping("movie/{movieId}")
    public Movie getMovieById(@PathVariable Integer movieId) {
        return bookService.getMovie(movieId);
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

    @GetMapping("movielocation")
    public List<TheaterBox> getTheaterBox(@RequestParam("theaternumber") Integer theaterNumber) {
        List<TheaterBox> theaterBoxList = bookService.getTheaterBox(theaterNumber);

        for (TheaterBox theaterBox : theaterBoxList) {
            theaterBox.setTheaterBoxMovieList(bookService.getTheaterBoxTimeTable(theaterBox));
            theaterBox.setMovieList(theaterBoxService.getMovieListByTheaterBoxId(theaterBox.getId()));
            // 상영 가능한 영화를 싹 끌고옴.
        }
        return theaterBoxList;
    }

    @GetMapping("date")
    public Map<String, Object> getDate() {
        Integer dayOfWeek = bookService.getDayOfWeek();
        List<LocalDate> bookPeriodList = bookService.getBookPeriodList();

        Map<String, Object> map = new HashMap<>();
        map.put("dayOfWeek", dayOfWeek);
        map.put("bookPeriodList", bookPeriodList);

        return map;
    }

    @PostMapping("bookplacetime/add")
    public ResponseEntity addBookPlaceTime(@RequestBody Map<String, Object> requestBody) {
        return bookService.addBookPlaceTime(requestBody);
    }
}
