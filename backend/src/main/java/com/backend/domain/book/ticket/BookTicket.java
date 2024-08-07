package com.backend.domain.book.ticket;

import lombok.Data;

import java.util.List;

@Data
public class BookTicket {
    private Integer bookTicketPaymentId;
    private Integer bookTicketMovieId;
    private Integer bookTicketBookPlaceTimeId;
    private Integer bookTicketMemberNumber;
    private String bookTicketRowCols;
    private Integer bookTicketPrice;
    private Boolean isValid;

    private List<String> bookTicketRowColList;
}
