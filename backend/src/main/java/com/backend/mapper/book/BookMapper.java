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
            WHERE DATE_ADD(start_date, INTERVAL 1 MONTH) >= NOW()
              AND start_date <= NOW()
            """)
    List<Map<String, Object>> selectAllOnScreenByDate();

    @Select("""
            SELECT id, title, running_time, rating, start_date
            FROM movie
            WHERE DATE_SUB(start_date, INTERVAL 1 MONTH) <= NOW()
              AND start_date > NOW()
            """)
    List<Map<String, Object>> selectAllWillScreenByDate();

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
            SELECT LAST_DAY(#{oneWeekAgo})
            """)
    LocalDate selectEndOfMonthByOneWeekAgo(LocalDate oneWeekAgo);

    @Select("""
            WITH RECURSIVE DateRange AS (
                SELECT DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY) AS Date
                UNION ALL
                SELECT DATE_ADD(Date, INTERVAL 1 DAY)
                FROM DateRange
                WHERE Date < DATE_ADD(CURRENT_DATE(), INTERVAL 14 DAY )
            )
            SELECT Date
            FROM DateRange;
            """)
    List<LocalDate> selectAllBookPeriodListByDate();
}
