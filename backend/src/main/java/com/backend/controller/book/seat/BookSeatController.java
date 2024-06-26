package com.backend.controller.book.seat;

import com.backend.service.book.seat.BookSeatService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/book/theaterseat")
public class BookSeatController {

    private final BookSeatService bookSeatService;

    @GetMapping("{bookPlaceTimeId}")
    public Map<String, Object> bookTheaterSeat(@PathVariable Integer bookPlaceTimeId) {
        return bookSeatService.getDataByBookPlaceTimeId(bookPlaceTimeId);
    }
}
