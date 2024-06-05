package com.backend.mapper.movie;

import com.backend.domain.movie.Movie;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface MovieMapper {

    @Insert("""
            INSERT INTO movie
            (title, content, genre, running_time,
            rating, start_Date, director, actors)
            VALUES (#{title}, #{content}, #{genre}, #{runningTime},
                   #{rating}, #{startDate}, #{director}, #{actors})
            """)
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insertMovie(Movie movie);

    @Insert("""
            INSERT INTO movie_type
            (movie_id, name)
            VALUES (#{movieId}, #{movieType})
            """)
    int insertMovieType(Integer movieId, String movieType);


    @Select("""
            SELECT * 
            FROM movie
            ORDER BY id DESC
            """)
    List<Movie> selectList();

    @Select("""
            SELECT *
            FROM movie
            WHERE id = #{movieId}
            """)
    Movie selectByMovieId(Integer movieId);
}
