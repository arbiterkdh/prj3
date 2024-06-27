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
            rating, start_Date, director, actors, alphabet, number)
            VALUES (#{title}, #{content}, #{genre}, #{runningTime},
                   #{rating}, #{startDate}, #{director}, #{actors}, #{alphabet}, #{number})
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
            <script>
            SELECT *
            FROM movie
            WHERE DATEDIFF(start_date, #{today}) &lt;= 0
                <if test="keyword != null">
                    <bind name="pattern" value="'%' + keyword + '%'" />
                    AND title LIKE #{pattern}
                </if>
            ORDER BY id DESC
            LIMIT 0, #{endset}
            </script>
            """)
    List<Movie> selectNowShowingMovieList(Integer endset, LocalDate today, String keyword);


    @Select("""
            <script>
            SELECT *
            FROM movie
            WHERE DATEDIFF(start_date, #{today}) &gt; 0
                <if test="keyword != null">
                    <bind name="pattern" value="'%' + keyword + '%'" />
                    AND title LIKE #{pattern}
                </if>
            ORDER BY id DESC
            LIMIT 0, #{endset}
            </script>
            """)
    List<Movie> selectComingSoonMovietList(Integer endset, LocalDate today, String keyword);


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
            <script>
            SELECT COUNT(*)
            FROM movie
            WHERE DATEDIFF(start_date, #{today}) <![CDATA[<=]]>0
                <if test="keyword != null">
                    <bind name="pattern" value="'%' + keyword + '%'" />
                    AND title LIKE #{pattern}
                </if>
            </script>
            """)
    Integer countNowShowingMovie(LocalDate today, String keyword);


    @Select("""
            <script>
            SELECT COUNT(*)
            FROM movie
            WHERE DATEDIFF(start_date, #{today}) <![CDATA[>]]> 0
                <if test="keyword != null">
                    <bind name="pattern" value="'%' + keyword + '%'" />
                    AND title LIKE #{pattern}
                </if>
            </script>
            """)
    Integer countComingSoonMovie(LocalDate today, String keyword);


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


    @Delete("""
            DELETE FROM movie_like
            WHERE movie_id = #{movieId} AND member_id = #{memberId}
            """)
    int deleteLikeByMovieIdAndMemberId(Integer movieId, Integer memberId);


    @Insert("""
            INSERT INTO movie_like (movie_id, member_id)
            VALUES (#{movieId}, #{memberId})
            """)
    int insertMovieLike(Integer movieId, Integer memberId);


    @Select("""
            SELECT COUNT(*)
            FROM movie_like
            WHERE movie_id = #{movieId}
            """)
    int countMovieLike(Integer movieId);

    @Select("""
            SELECT COUNT(*)
            FROM movie_like
            WHERE movie_id = #{movieId} AND member_id = #{memberId}
            """)
    int selectMovieLikeByMovieIdAndMemberId(Integer movieId, Integer memberId);


    @Delete("""
            DELETE FROM movie_like
            WHERE movie_id = #{movieId}
            """)
    int deleteMovieLikeByMovieId(Integer movieId);


    @Delete("""
            DELETE FROM movie_location
            WHERE movie_id = #{movieId}
            """)
    int deleteMovieLocationByMovieId(Integer movieId);


    @Delete("""
            DELETE FROM theater_box_movie
            WHERE movie_id = #{movieId}
            """)
    int deleteTheaterBoxMovieByMovieId(Integer movieId);

    @Delete("""
            DELETE FROM book_place_time
            WHERE theater_box_movie_id = #{id}
            """)
    int deleteBookPlaceTimeByMovieId(Integer id);


    @Select("""
            SELECT id FROM theater_box_movie
            WHERE movie_id = #{movieId}
            """)
    List<Integer> selectTheaterBoxMovieByMovieId(Integer movieId);


    @Delete("""
            DELETE FROM book_place_time
            WHERE theater_box_movie_id = #{id}
            """)
    int deleteBookPlaceTime(Integer id);


    @Delete("""
            DELETE FROM theater_box_movie
            WHERE id = #{id}
            """)
    int deleteTheaterBoxMovie(Integer id);

    @Select("""
            SELECT book_place_time_id
            FROM book_place_time
            WHERE theater_box_movie_id = #{id}
            """)
    List<Integer> selectBookPlaceTimeId(Integer id);

    @Delete("""
            DELETE FROM book_seat
            WHERE book_seat_book_place_time_id = #{id}
            """)
    int deleteBookSeat(Integer id);
}

