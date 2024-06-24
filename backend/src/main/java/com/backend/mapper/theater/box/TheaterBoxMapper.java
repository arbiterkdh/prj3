package com.backend.mapper.theater.box;

import com.backend.domain.theater.box.TheaterBox;
import com.backend.domain.theater.box.TheaterBoxMovie;
import org.apache.ibatis.annotations.Mapper;
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
}
