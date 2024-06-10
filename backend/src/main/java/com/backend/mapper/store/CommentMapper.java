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
            """)
    List<ProductComment> commentList(Integer productId);

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
}
