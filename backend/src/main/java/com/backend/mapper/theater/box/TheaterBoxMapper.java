package com.backend.mapper.theater.box;

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
}
