package com.backend.mapper.book;

import com.backend.domain.movie.Movie;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface BookMapper {

    @Select("""
            SELECT *
            FROM 
            """)
    List<Movie> selectMovieIdByTheaterLocation(String location);
}
