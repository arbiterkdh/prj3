package com.backend.mapper.theater;

import com.backend.domain.theater.Theater;
import com.backend.domain.theater.box.TheaterBox;
import com.backend.domain.theater.box.TheaterBoxMovie;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface TheaterMapper {

    @Select("""
            SELECT *
            FROM theater
            WHERE city = #{city}
            ORDER BY location
            """)
    List<Theater> selectAllByCity(String city);

    @Select("""
            SELECT *
            FROM theater
            WHERE city = #{city}
            AND location = #{location}
            """)
    Theater selectTheaterByCityAndLocation(String city, String location);

    @Insert("""
            INSERT INTO theater
            (city, location)
            VALUES (#{city}, #{location})
            """)
    @Options(useGeneratedKeys = true, keyProperty = "number")
    int insert(Theater theater);

    @Select("""
            SELECT DISTINCT city
            FROM theater
            """)
    List<String> selectAllCity();

    @Delete("""
            DELETE FROM theater
            WHERE number = #{number}
            """)
    int deleteTheaterByNumber(Integer number);

    @Select("""
            SELECT *
            FROM theater_box
            WHERE theater_number = #{theaterNumber}
            """)
    List<TheaterBox> selectTheaterBoxByTheaterNumber(Integer theaterNumber);

    @Select("""
            SELECT *
            FROM theater_box_movie
            WHERE theater_box_id = #{theaterBoxId}
            """)
    List<TheaterBoxMovie> selectTheaterBoxMovieByTheaterBoxId(Integer theaterBoxId);
}
