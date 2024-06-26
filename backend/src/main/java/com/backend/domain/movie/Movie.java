package com.backend.domain.movie;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class Movie {
    private Integer id;
    private String title;
    private String content;
    private String genre;
    private Integer runningTime;
    private String rating;
    private LocalDate startDate;
    private String director;
    private String actors;
    private String alphabet;
    private String number;
    private List<String> type;
    private String movieImageFile;
    private MovieHeart movieHeart;
}
