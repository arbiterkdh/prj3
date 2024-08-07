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

    @GetMapping("")
    public Map<String, Object> bookTheaterSeat(
            @RequestParam("bookplacetimeid") Integer bookPlaceTimeId,
            @RequestParam("bookseatmembernumber") Integer bookSeatMemberNumber) {

        bookSeatService.removeBookSeatByTimeoutExpiredWithoutPayment();

        return bookSeatService.getDataByBookPlaceTimeId(bookPlaceTimeId, bookSeatMemberNumber);
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
        BookPlaceTime updatedBookPlaceTime = bookService.getBookPlaceTimeByBookPlaceTimeId(bookPlaceTimeId);

        Map<String, Object> data = Map.of(
                "rowColList", rowColList,
                "bookPlaceTime", updatedBookPlaceTime);

        if (bookSeatState.equals("alreadyBooked")) { // 409
            return ResponseEntity.status(HttpStatus.CONFLICT).body(data);
        } else if (bookSeatState.equals("deleted") || bookSeatState.equals("added")) {
            return ResponseEntity.ok(data);
        }
        return null;
    }

    @PutMapping("state/paying")
    public ResponseEntity modifyBookSeatIsPaying(@RequestBody BookSeat bookSeat) {
        boolean result = bookSeatService.modifyBookSeatIsPaying(bookSeat);
        return result ?
                ResponseEntity.status(HttpStatus.OK).build() :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @DeleteMapping("delete")
    public void deleteAllBookSeatByClickingCloseButton(
            @RequestParam("bookseatmembernumber") Integer bookSeatMemberNumber,
            @RequestParam("bookplacetimeid") Integer bookPlaceTimeId) {
        bookSeatService.deleteAllBookSeatByBookSeatMemberNumber(bookSeatMemberNumber, bookPlaceTimeId);
    }

}
