package com.backend.domain.book.seat.request;

import com.backend.domain.book.BookPlaceTime;
import lombok.Data;

@Data
public class BookSeatRequest {
    private BookPlaceTime bookPlaceTime;
    private String rowCol;
}
