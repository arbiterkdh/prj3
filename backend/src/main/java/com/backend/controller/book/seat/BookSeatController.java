package com.backend.controller.book.seat;

import com.backend.domain.book.BookPlaceTime;
import com.backend.domain.book.seat.BookSeat;
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

        bookSeatService.removeBookSeatByTimeoutExpiredWithoutPayment();

        return bookSeatService.getDataByBookPlaceTimeId(bookPlaceTimeId);
    }

    @PostMapping("state")
    public ResponseEntity handleBookSeatState(@RequestBody BookSeat bookSeat) {
        Integer bookPlaceTimeId = bookSeat.getBookPlaceTimeId();
        BookPlaceTime bookPlaceTime = bookService.getBookPlaceTimeByBookPlaceTimeId(bookPlaceTimeId);

        boolean timeRemain = bookService.checkTimeByBookPlaceTimeId(bookPlaceTimeId);

        if (!timeRemain) return ResponseEntity.status(HttpStatus.GATEWAY_TIMEOUT).build();
        // 504 예매가능 시간초과시 응답.

        String bookSeatState = bookSeatService.handleBookSeat(bookSeat);
        List<String> rowColList = bookSeatService.getRowColList(bookPlaceTime);

        if (bookSeatState.equals("alreadyBooked")) { // 409
            return ResponseEntity.status(HttpStatus.CONFLICT).body(rowColList);
        } else if (bookSeatState.equals("deleted") || bookSeatState.equals("added")) {
            return ResponseEntity.ok(rowColList);
        }
        return null;
    }

    @DeleteMapping("{bookSeatMemberNumber}/delete")
    public void cancelBookSoDeleteAllBookSeat(@PathVariable Integer bookSeatMemberNumber) {
        bookSeatService.deleteAllBookSeatByBookSeatMemberNumber(bookSeatMemberNumber);
    }

}
