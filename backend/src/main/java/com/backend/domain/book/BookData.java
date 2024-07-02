package com.backend.domain.book;

import com.backend.domain.movie.Movie;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class BookData {
    private Integer bookSeatBookPlaceTimeId;
    private List<String> seatSelected;
    private Integer numberOfPeople;
    private Integer totalAmount;
    private Movie movie;
    private String city;
    private String location;
    private Integer boxNumber;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
}
