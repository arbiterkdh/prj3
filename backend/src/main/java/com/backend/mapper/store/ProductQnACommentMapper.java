package com.backend.mapper.store;


import com.backend.domain.store.ProductQnAComment;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ProductQnACommentMapper {


    @Insert("""
            INSERT INTO product_qna_comment(content, product_qna_id, is_admin)
            VALUES(#{content}, #{productQnAId}, #{isAdmin})
            """)
    int addQnAComment(ProductQnAComment qnAComment);

    @Select("""
            SELECT *
            FROM product_qna_comment
            WHERE product_qna_id = #{idQnA}
            """)
    List<ProductQnAComment> readQnAComment(Integer idQnA);

    @Delete("""
            DELETE FROM
            product_qna_comment
            WHERE product_qna_id = #{productQnAId}
            """)
    int deleteQnAComment(Integer productQnAId);
}
