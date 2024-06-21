package com.backend.mapper.store;


import com.backend.domain.store.ProductQnAComment;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface ProductQnACommentMapper {


    @Insert("""
            INSERT INTO product_qna_comment(content, product_qna_id)
            VALUES(#{content}, #{productQnAId})
            """)
    int addQnAComment(ProductQnAComment qnAComment);

    @Select("""
            SELECT *
            FROM product_qna_comment
            WHERE product_qna_id = #{idQnA}
            """)
    ProductQnAComment readQnAComment(Integer idQnA);
}
