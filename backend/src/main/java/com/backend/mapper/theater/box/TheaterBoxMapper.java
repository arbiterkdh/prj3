package com.backend.mapper.theater.box;

import com.backend.domain.movie.Movie;
import com.backend.domain.theater.box.TheaterBox;
import com.backend.domain.theater.box.TheaterBoxMovie;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface TheaterBoxMapper {
    @Select("""
            SELECT *
            FROM theater_box
            WHERE theater_number = #{theaterNumber}
            """)
    List<TheaterBox> selectAllTheaterBoxByTheaterNumber(Integer theaterNumber);


    @Select("""
            SELECT *
            FROM theater_box_movie
            WHERE theater_box_id = #{theaterBoxId}
            """)
    List<TheaterBoxMovie> selectAllTheaterBoxMovieByTheaterBoxId(Integer theaterBoxId);

    @Select("""
            SELECT *
            FROM theater_box
            WHERE id = #{theaterBoxId}
            """)
    TheaterBox selectTheaterBox(Integer theaterBoxId);

    @Insert("""
            INSERT INTO theater_box_movie
            (movie_id, theater_box_id)
            VALUES (#{movieId}, #{theaterBoxId})
            """)
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insertTheaterBoxMovie(TheaterBoxMovie theaterBoxMovie);

    @Select("""
            SELECT COUNT(*)
            FROM theater_box_movie
            WHERE theater_box_id = #{theaterBoxId}
            AND movie_id = #{movieId}
            """)
    int checkConflict(TheaterBoxMovie theaterBoxMovie);

    @Select("""
            SELECT m.id, m.title, m.running_time, m.start_date, m.genre, m.rating
            FROM theater_box tb JOIN movie_location ml ON tb.theater_number = ml.theater_number
                                JOIN movie m ON ml.movie_id = m.id
            WHERE tb.id = #{theaterBoxId}
            """)
    List<Movie> selectAllMovieByTheaterBoxId(Integer theaterBoxId);

    @Select("""
            SELECT tb.id, tb.box_number, tb.theater_number, tb.capacity
            FROM theater_box tb JOIN theater_box_movie tbm ON tb.id = tbm.theater_box_id
            WHERE tbm.id = #{theaterBoxMovieId}
            """)
    TheaterBox selectTheaterBoxByTheaterBoxMovieId(Integer theaterBoxMovieId);
}
