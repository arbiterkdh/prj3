package com.backend.mapper.book;

import com.backend.domain.book.MovieLocation;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Mapper
public interface BookMapper {


    @Insert("""
            INSERT INTO movie_location
            (movie_id, theater_number)
            VALUES
            (#{movie_id}, #{theater_number})
            """)
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insertMovieLocation(MovieLocation movieLocation);

    @Select("""
            SELECT COUNT(*)
            FROM movie_location
            WHERE movie_id = #{movie_id} AND theater_number = #{theater_number}
            """)
    int checkConflict(MovieLocation movieLocation);

    @Select("""
            SELECT *
            FROM movie_location
            """)
    List<MovieLocation> selectAllMovieLocation();

    @Select("""
            SELECT movie_id
            FROM movie_location
            WHERE theater_number = #{theater_number};
            """)
    List<Integer> selectMovieIdByTheaterNumber(Integer theater_number);

    @Select("""
            SELECT id, title, running_time, rating, start_date
            FROM movie
            WHERE DATE_ADD(start_date, INTERVAL 3 WEEK) >= #{date}
              AND start_date <= #{date}
              AND start_date <= NOW()
            """)
    List<Map<String, Object>> selectAllOnScreenByDate(LocalDate date);

    @Select("""
            SELECT id, title, running_time, rating, start_date
            FROM movie
            WHERE #{date} > start_date
              AND start_date >= NOW()
            """)
    List<Map<String, Object>> selectAllWillScreenByDate(LocalDate date);

    @Select("""
            SELECT theater_number
            FROM movie_location
            WHERE movie_id = #{movie_id};
            """)
    List<Integer> selectAllTheaterNumberByMovieId(Integer movie_id);

    @Select("""
            SELECT DAYOFWEEK(NOW())
            """)
    Integer selectDayOfWeek();

    @Select("""
            WITH RECURSIVE DateRange AS (
                SELECT CURRENT_DATE() AS Date
                UNION ALL
                SELECT DATE_ADD(Date, INTERVAL 1 DAY)
                FROM DateRange
                WHERE Date < DATE_ADD(CURRENT_DATE(), INTERVAL 21 DAY )
            )
            SELECT Date
            FROM DateRange;
            """)
    List<LocalDate> selectAllBookPeriodListByDate();
}
