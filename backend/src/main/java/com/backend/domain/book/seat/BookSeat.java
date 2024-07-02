package com.backend.domain.book.seat;

import lombok.Data;

import java.util.List;

@Data
public class BookSeat {
    private Integer bookSeatBookPlaceTimeId;
    private String rowCol;
    private Integer bookSeatMemberNumber;
    private boolean isPaying;

    // axios 요청용
    private Integer bookPlaceTimeId;
    private List<String> rowColList;
}
