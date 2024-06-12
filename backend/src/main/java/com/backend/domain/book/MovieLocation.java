package com.backend.domain.book;

import lombok.Data;

@Data
public class MovieLocation {
    private Integer id;
    private Integer movie_id;
    private Integer theater_number;
}
