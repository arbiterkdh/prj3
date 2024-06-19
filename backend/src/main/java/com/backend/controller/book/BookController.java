package com.backend.controller.book;

import com.backend.domain.book.MovieLocation;
import com.backend.domain.movie.Movie;
import com.backend.domain.theater.box.TheaterBox;
import com.backend.domain.theater.box.TheaterBoxTimeTable;
import com.backend.service.book.BookService;
import com.backend.service.theater.TheaterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/book")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;
    private final TheaterService theaterService;

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
    public Map<String, Object> getTheaterBox(@RequestParam("theaternumber") Integer theaterNumber) {
        Map<String, Object> result = new HashMap<>();
        List<TheaterBox> theaterBoxList = bookService.getTheaterBox(theaterNumber);
        List<TheaterBoxTimeTable> theaterBoxTimeTableList = new ArrayList<>();

        for (TheaterBox theaterBox : theaterBoxList) {
            theaterBoxTimeTableList.add(bookService.getTheaterBoxTimeTable(theaterBox));
            theaterBox.setTheaterTimeTableList(theaterBoxTimeTableList);
        }

        result.put("theaterBoxList", theaterBoxList);

        return result;
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
}
