package com.backend.mapper.store;

import com.backend.domain.store.ProductComment;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface CommentMapper {

    @Insert("""
            INSERT INTO product_comment(writer, content, product_id)
            VALUES (#{writer}, #{content}, #{productId})
            """)
    int addComment(ProductComment productComment);

    @Select("""
            SELECT *
            FROM product_comment
            WHERE product_id = #{productId}
            order by id desc
            limit #{offset}, 10
            """)
    List<ProductComment> commentList(Integer productId, Integer offset);

    @Update("""
            UPDATE product_comment
            SET content = #{content}
            WHERE id = #{id}
            """)
    int modifyComment(ProductComment productComment);

    @Delete("""
            DELETE FROM product_comment
            WHERE id = #{commentId}
            """)
    int deleteComment(Integer commentId);


    @Select("""
            SELECT COUNT(*)
            FROM product_comment
            WHERE product_id = #{productId}
            """)
    int totalCommentCount(Integer productId);

}
