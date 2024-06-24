package com.backend.controller.theater.box;

import com.backend.domain.theater.box.TheaterBox;
import com.backend.domain.theater.box.TheaterBoxMovie;
import com.backend.service.book.BookService;
import com.backend.service.theater.box.TheaterBoxService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/theaterbox")
@RequiredArgsConstructor
public class TheaterBoxController {

    private final TheaterBoxService theaterBoxService;
    private final BookService bookService;

    @PostMapping("add")
    public TheaterBox addTheaterBox(@RequestBody TheaterBox theaterBox) {

        return null;
    }

    @GetMapping("onscreenlist")
    public List<TheaterBox> getOnscreenListByDateAndTheaterNumber(@RequestParam String date, @RequestParam Integer theaterNumber) {
//        theaterBoxService
        return null;
    }

    @GetMapping("list/{theaterNumber}")
    public List<TheaterBox> getTheaterBoxList(@PathVariable Integer theaterNumber) {

        List<TheaterBox> theaterBoxList = theaterBoxService.getTheaterBoxList(theaterNumber);
        // 해당 극장의 상영관 집합 얻어오기.
        for (TheaterBox theaterBox : theaterBoxList) {
            List<TheaterBoxMovie> theaterBoxMovieList = theaterBoxService.getTheaterBoxMovieList(theaterBox.getId());
            // 각 상영관의 상영영화 집합 얻어오기.

            for (TheaterBoxMovie theaterBoxMovie : theaterBoxMovieList) {
                theaterBoxMovie.setBookPlaceTimeList(bookService.getAllBookPlaceTimeByTheaterBoxMovieId(theaterBoxMovie.getId()));
            } // 각 상영영화의 타임 테이블 집합 얻어오기.

            theaterBox.setTheaterBoxMovieList(theaterBoxMovieList);
            theaterBox.setBookPlaceTimeLeft(bookService.checkBookPlaceTimeLeftByTheaterBoxId(theaterBox.getId()));
            theaterBox.setMovieIdList(bookService.getMovieIdListByTheaterBoxId(theaterBox.getId()));
            // 각 상영관 객체에 데이터 집어넣기.
        }

        return theaterBoxList;
    }

    @GetMapping("{theaterBoxId}")
    public TheaterBox getTheaterBox(@PathVariable Integer theaterBoxId) {
        TheaterBox theaterBox = theaterBoxService.getTheaterBox(theaterBoxId);
        List<TheaterBoxMovie> theaterBoxMovieList = theaterBoxService.getTheaterBoxMovieList(theaterBoxId);

        for (TheaterBoxMovie theaterBoxMovie : theaterBoxMovieList) {
            theaterBoxMovie.setBookPlaceTimeList(bookService.getAllBookPlaceTimeByTheaterBoxMovieId(theaterBoxMovie.getId()));
        }

        theaterBox.setTheaterBoxMovieList(theaterBoxMovieList);
        theaterBox.setBookPlaceTimeLeft(bookService.checkBookPlaceTimeLeftByTheaterBoxId(theaterBoxId));
        theaterBox.setMovieIdList(bookService.getMovieIdListByTheaterBoxId(theaterBoxId));

        return theaterBox;

    }
}
