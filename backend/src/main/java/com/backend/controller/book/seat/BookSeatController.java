package com.backend.controller.book.seat;

import com.backend.domain.book.BookPlaceTime;
import com.backend.domain.book.seat.BookSeat;
import com.backend.domain.book.seat.request.BookSeatRequest;
import com.backend.service.book.BookService;
import com.backend.service.book.seat.BookSeatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/book/theaterseat")
public class BookSeatController {

    private final BookSeatService bookSeatService;
    private final BookService bookService;

    @GetMapping("{bookPlaceTimeId}")
    public Map<String, Object> bookTheaterSeat(@PathVariable Integer bookPlaceTimeId) {
        return bookSeatService.getDataByBookPlaceTimeId(bookPlaceTimeId);
    }

    @PostMapping("state")
    public ResponseEntity handleBookSeatState(@RequestBody BookSeatRequest requestBody) {
        BookPlaceTime bookPlaceTime = requestBody.getBookPlaceTime();
        String rowCol = requestBody.getRowCol();

        boolean timeRemain = bookService.checkTimeByBookPlaceTimeId(bookPlaceTime.getBookPlaceTimeId());

        if (!timeRemain) return ResponseEntity.status(HttpStatus.GATEWAY_TIMEOUT).build();
        // 504 예매가능 시간초과시 응답.

        BookSeat bookedSeat = bookSeatService.getBookSeat(bookPlaceTime, rowCol);
        List<String> rowColList = bookSeatService.getRowColList(bookPlaceTime);

        if (bookedSeat != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(rowColList);
            // 409 예매중이거나, 이미 예매된 좌석.
        }

        bookSeatService.addBookSeat(bookPlaceTime, rowCol);

        return null;
    }

}
