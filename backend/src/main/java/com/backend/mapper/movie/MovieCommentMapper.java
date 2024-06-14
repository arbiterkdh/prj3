package com.backend.mapper.movie;

import com.backend.domain.movie.MovieComment;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface MovieCommentMapper {

    @Insert("""
            INSERT INTO movie_comment
            (movie_id, member_id, comment)
            VALUES (#{movieId}, #{memberId}, #{comment})
            """)
    int insertMovieComment(MovieComment comment);


    @Select("""
            SELECT mc.id,
                   mc.member_id memberId,
                   mc.comment,
                   mc.inserted,
                   m.nick_name nickName
            FROM movie_comment mc JOIN member m ON mc.member_id = m.number
            WHERE movie_id = #{movieId}
            ORDER BY mc.id DESC
            LIMIT #{offset}, 10;
            """)
    List<MovieComment> selectCommentByMovieId(Integer movieId, Integer offset);

    @Select("""
            SELECT *
            FROM movie_comment
            WHERE id = #{commentId}
            """)
    MovieComment selectCommentByCommentId(Integer commentId);


    @Delete("""
            DELETE FROM movie_comment
            WHERE id = #{commentId}
            """)
    int deleteCommentByCommentId(Integer commentId);

    @Delete("""
            DELETE FROM movie_comment
            WHERE movie_id = #{movieId}
            """)
    int deleteCommentByMovieId(Integer movieId);


    @Update("""
            UPDATE movie_comment
            SET comment = #{comment}
            WHERE id = #{id}
            """)
    int updateComment(MovieComment comment);


    @Select("""
            SELECT COUNT(*)
            FROM movie_comment
            WHERE movie_id = #{movieId}
            """)
    Integer countCommentByMovieId(Integer movieId);
}
