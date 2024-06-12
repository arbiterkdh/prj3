package com.backend.mapper.book;

import com.backend.domain.book.MovieLocation;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

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
            SELECT m.id, m.title, m.running_time, m.rating, m.start_date, l.movie_id, l.theater_number
            FROM movie m LEFT JOIN movie_location l ON m.id = l.movie_id
            WHERE DATE_ADD(start_date, INTERVAL 1 MONTH) >= NOW()
            AND start_date <= NOW()
            """)
    List<Map<String, Object>> selectAllOnMovieByDate();
}
