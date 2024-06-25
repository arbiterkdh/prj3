package com.backend.mapper.book;

import com.backend.domain.book.BookPlaceTime;
import com.backend.domain.book.MovieLocation;
import com.backend.domain.movie.Movie;
import com.backend.domain.theater.box.TheaterBox;
import com.backend.domain.theater.box.TheaterBoxMovie;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

import java.time.LocalDate;
import java.time.LocalDateTime;
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
    List<Integer> selectAllMovieIdByTheaterNumber(Integer theaterNumber);

    @Select("""
            SELECT id, title, running_time, rating, start_date
            FROM movie
            WHERE DATE_ADD(start_date, INTERVAL 20 DAY) >= #{date}
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
                WHERE Date < DATE_ADD(CURRENT_DATE(), INTERVAL 20 DAY)
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
            SELECT tbm.id, tbm.movie_id, tbm.theater_box_id, m.title as movieTitle, m.start_date, m.genre, m.running_time
            FROM theater_box_movie tbm JOIN movie m ON tbm.movie_id = m.id
            WHERE theater_box_id = #{id}
            """)
    List<TheaterBoxMovie> selectTheaterBoxTimeTableByTheaterBoxId(Integer id);

    @Select("""
            SELECT *
            FROM movie
            WHERE start_date <= CURRENT_DATE()
              AND DATE_ADD(start_date, INTERVAL 20 DAY) > CURRENT_DATE()
            """)
    List<Movie> selectAllOnscreen();

    @Select("""
            SELECT *
            FROM movie
            WHERE start_date > CURRENT_DATE()
            """)
    List<Movie> selectAllWillScreen();

    @Select("""
            SELECT *
            FROM book_place_time
            WHERE theater_box_movie_id = #{theaterBoxMovieId}
            ORDER BY start_time
            """)
    List<BookPlaceTime> selectAllBookPlaceTimeByTheaterBoxMovieId(Integer theaterBoxMovieId);

    @Select("""
            SELECT COUNT(*)
            FROM book_place_time bpt
            JOIN theater_box_movie tbm ON bpt.theater_box_movie_id = tbm.id
            JOIN theater_box tb ON tbm.theater_box_id = tb.id
            WHERE tbm.theater_box_id = #{theaterBoxId}
            AND bpt.start_time > CURRENT_TIME()
            """)
    int countAllBookPlaceTimeByTheaterBoxId(Integer theaterBoxId);

    @Select("""
            SELECT tbm.movie_id
            FROM theater_box tb JOIN theater_box_movie tbm ON tb.id = tbm.theater_box_id
            WHERE tb.id = #{theaterBoxId}
            """)
    List<Integer> selectAllMovieIdByTheaterBoxId(Integer theaterBoxId);

    @Insert("""
            INSERT INTO book_place_time
            (theater_box_movie_id, start_time, end_time)
            VALUES (#{theaterBoxMovieId}, #{startTime},
                    DATE_ADD(#{startTime},
                        INTERVAL CEIL((
                            SELECT running_time
                            FROM movie
                            WHERE id = #{movieId}) / 10) * 10 + 10
                        MINUTE ))
            """)
    @Options(keyProperty = "bookPlaceTimeId")
    int addBookPlaceTime(Integer theaterBoxMovieId, Integer movieId, LocalDateTime startTime);

    @Select("""
            SELECT COUNT(*)
            FROM book_place_time
            WHERE start_time BETWEEN #{startTime} AND DATE_ADD(#{endTime}, INTERVAL 9 MINUTE)
            OR end_time BETWEEN DATE_SUB(#{startTime}, INTERVAL 9 MINUTE) AND #{endTime}
            """)
    int checkTimeConflict(Integer theaterBoxMovieId, LocalDateTime startTime, LocalDateTime endTime);

    @Select("""
            SELECT *
            FROM book_place_time
            WHERE theater_box_movie_id = #{theaterBoxMovieId}
            AND DATE(start_time) = #{selectedDate}
            """)
    List<BookPlaceTime> selectAllBookPlaceTimeByTheaterBoxMovieIdAndDate(Integer theaterBoxMovieId, LocalDate selectedDate);

    @Select("""
            SELECT bpt.book_place_time_id, bpt.theater_box_movie_id, bpt.vacancy, bpt.start_time, bpt.end_time
            FROM book_place_time bpt
                JOIN theater_box_movie tbm ON bpt.theater_box_movie_id = tbm.id
                JOIN movie m ON tbm.movie_id = m.id
            WHERE theater_box_movie_id = #{theaterBoxMovieId}
            AND DATE(start_time) = #{selectedDate}
            AND m.id = #{movieId}
            """)
    List<BookPlaceTime> selectAllBookPlaceTimeByTheaterBoxMovieIdAndDateAndMovieId(Integer theaterBoxMovieId, LocalDate selectedDate, Integer movieId);
}
