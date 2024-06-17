package com.backend.mapper.movie;

import com.backend.domain.movie.Movie;
import org.apache.ibatis.annotations.*;

import java.time.LocalDate;
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
            WHERE DATEDIFF(start_date, #{today}) <= 0
            ORDER BY id DESC
            LIMIT 0, #{endset}
            """)
    List<Movie> selectNowShowingMovieList(Integer endset, LocalDate today);


    @Select("""
            SELECT *
            FROM movie
            WHERE DATEDIFF(start_date, #{today}) > 0
            ORDER BY id DESC
            LIMIT 0, #{endset}
            """)
    List<Movie> selectComingSoonMovietList(Integer endset, LocalDate today);


    @Select("""
            SELECT *
            FROM movie
            WHERE id = #{movieId}
            """)
    Movie selectByMovieId(Integer movieId);

    @Select("""
            SELECT name
            FROM movie_type
            WHERE movie_id = #{movieId}
            """)
    List<String> selectMovieTypeById(Integer movieId);

    @Delete("""
            DELETE FROM movie_type
            WHERE movie_id = #{movieId}
            """)
    int deleteMovieTypeByMovieId(Integer movieId);

    @Delete("""
            DELETE FROM movie
            WHERE id = #{movieId}
            """)
    int deleteMovieByMovieId(Integer movieId);

    @Update("""
            UPDATE movie
            SET id = #{id},
                title = #{title},
                content = #{content},
                genre = #{genre},
                running_time = #{runningTime},
                rating = #{rating},
                start_Date = #{startDate},
                director = #{director},
                actors = #{actors}
            WHERE id = #{id}
            """)
    int updateMovie(Movie movie);


    @Select("""
            SELECT COUNT(*)
            FROM movie
            WHERE DATEDIFF(start_date, #{today}) <= 0
            """)
    Integer countNowShowingMovie(LocalDate today);


    @Select("""
            SELECT COUNT(*)
            FROM movie
            WHERE DATEDIFF(start_date, #{today}) > 0
            """)
    Integer countComingSoonMovie(LocalDate today);

    Integer countAllMovie();

    @Select("""
            SELECT *
            FROM movie
            """)
    List<Movie> selectAllMovie();

    @Insert("""
            INSERT INTO movie_file (movie_id, name)
            VALUES (#{movieId}, #{name})
            """)
    int insertFileName(Integer movieId, String name);

    @Select("""
            SELECT name
            FROM movie_file
            WHERE movie_id = #{movieId}
            """)
    String selectFileNameByMovieId(Integer movieId);


    @Delete("""           
            DELETE FROM movie_file
            WHERE movie_id = #{movieId}
            """)
    int deleteMovieImageFileByMovieId(Integer movieId);
}
