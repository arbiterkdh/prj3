package com.backend.domain.movie;

import lombok.Data;

import java.time.LocalDate;

@Data
public class Movie {
    private Integer id;
    private String title;
    private String content;
    private String genre;
    private Integer runningTime;
    private Integer rating;
    private LocalDate startDate;
    private String director;
    private String actors;
}
