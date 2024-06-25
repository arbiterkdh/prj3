package com.backend.controller.book.seat;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/book/theaterseat")
public class BookSeatController {

    @GetMapping("{bookPlaceTimeId}")
    public void bookTheaterSeat(@PathVariable Integer bookPlaceTimeId) {
        
    }
}
