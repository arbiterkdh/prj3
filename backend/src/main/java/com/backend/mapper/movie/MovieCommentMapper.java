package com.backend.mapper.movie;

import com.backend.domain.movie.MovieComment;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

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
            """)
    List<MovieComment> selectCommentByMovieId(Integer movieId);

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
}
