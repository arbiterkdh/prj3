package com.backend.domain.book.seat;

import lombok.Data;

@Data
public class BookSeat {
    private Integer bookSeatId;
    private Integer bookSeatBookPlaceTimeId;
    private String row;
    private Integer col;
}
