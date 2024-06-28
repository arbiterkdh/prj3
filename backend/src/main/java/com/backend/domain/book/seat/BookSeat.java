package com.backend.domain.book.seat;

import lombok.Data;

@Data
public class BookSeat {
    private Integer bookSeatBookPlaceTimeId;
    private String rowCol;
    private Integer bookSeatMemberNumber;
    private boolean isPaid;

    // axios 요청용
    private Integer bookPlaceTimeId;
}
