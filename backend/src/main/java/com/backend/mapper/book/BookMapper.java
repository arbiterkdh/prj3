package com.backend.mapper.book;

import com.backend.domain.book.MovieLocation;
import com.backend.domain.movie.Movie;
import com.backend.domain.theater.box.TheaterBox;
import com.backend.domain.theater.box.TheaterBoxTimeTable;
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
            (#{movieId}, #{theaterNumber})
            """)
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insertMovieLocation(MovieLocation movieLocation);

    @Select("""
            SELECT COUNT(*)
            FROM movie_location
            WHERE movie_id = #{movieId} AND theater_number = #{theaterNumber}
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
            WHERE theater_number = #{theaterNumber}
            """)
    List<Integer> selectMovieIdByTheaterNumber(Integer theaterNumber);

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
            WHERE movie_id = #{movieId}
            """)
    List<Integer> selectAllTheaterNumberByMovieId(Integer movieId);

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
                WHERE Date < DATE_ADD(CURRENT_DATE(), INTERVAL 3 WEEK)
            )
            SELECT Date
            FROM DateRange;
            """)
    List<LocalDate> selectAllBookPeriodListByDate();

    @Select("""
            SELECT tb.id, tb.box_number, tb.theater_number, t.location as theaterLocation
            FROM theater_box tb
                JOIN theater t ON t.number = tb.theater_number
            WHERE tb.theater_number = #{theaterNumber}
            """)
    List<TheaterBox> selectAllTheaterBoxByTheaterNumber(Integer theaterNumber);

    @Select("""
            SELECT tbtb.id, tbtb.movie_id, tbtb.theater_box_id, tbtb.time_interval, m.title
            FROM theater_box_time_table tbtb JOIN movie m ON tbtb.movie_id = m.id
            WHERE theater_box_id = #{id}
            """)
    TheaterBoxTimeTable selectTheaterBoxTimeTableByTheaterBoxId(Integer id);

    @Select("""
            SELECT *
            FROM movie
            WHERE start_date <= CURRENT_DATE()
              AND DATE_ADD(start_date, INTERVAL 3 WEEK) > CURRENT_DATE()
            """)
    List<Movie> selectAllOnscreen();

    @Select("""
            SELECT *
            FROM movie
            WHERE start_date > CURRENT_DATE()
            """)
    List<Movie> selectAllWillScreen();
}
