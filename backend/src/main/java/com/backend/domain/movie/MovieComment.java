package com.backend.domain.movie;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MovieComment {
    private Integer id;
    private Integer movieId;
    private Integer memberId;
    private String comment;
    private LocalDateTime inserted;
}
