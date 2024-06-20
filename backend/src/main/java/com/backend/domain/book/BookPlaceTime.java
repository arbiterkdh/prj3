package com.backend.domain.book;

import lombok.Data;

import java.sql.Time;
import java.time.LocalDate;

@Data
public class BookPlaceTime {
    private Integer id;
    private Integer theaterBoxMovieId;
    private Integer vacancy;
    private LocalDate date;
    private Time time;
}
