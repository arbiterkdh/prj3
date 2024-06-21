package com.backend.domain.book;

import lombok.Data;

@Data
public class MovieLocation {
    private Integer id;
    private Integer movieId;
    private Integer theaterNumber;
}
