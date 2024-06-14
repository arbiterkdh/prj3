package com.backend.mapper.store;


import com.backend.domain.store.ProductQnA;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface ProductQnAMapper {

    @Insert("""
            INSERT INTO product_qna(writer, title, content, product_id)
            VALUES (#{writer}, #{title}, #{content}, #{productId})
            """)
    int addQnA(ProductQnA productQnA);

    @Select("""
            SELECT *
            FROM product_qna
            WHERE product_id = #{productId}
            ORDER BY id desc
            LIMIT #{offset}, 10
            """)
    List<ProductQnA> listQnA(Integer productId, Integer offset);

    @Delete("""
            DELETE
            FROM product_qna
            WHERE id = #{id}
            """)
    int deleteQnA(Integer id);


    @Update("""
            UPDATE product_qna
            SET title = #{title}, content = #{content}
            WHERE id = #{id}
            """)
    int modifyQnA(ProductQnA productQnA);

    @Select("""
            SELECT COUNT(*)
            FROM product_qna
            WHERE product_id = #{productId}
            """)
    Integer totalCount(Integer productId);
}