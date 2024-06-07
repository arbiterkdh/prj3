package com.backend.mapper.store;


import org.apache.ibatis.annotations.*;

@Mapper
public interface ImageMapper {


    @Insert("""
            INSERT INTO product_image(name, path, product_id)
            VALUES(#{name}, #{path}, #{productId})
            """)
    int add(Integer productId, String name, String path);


    @Select("""
            SELECT name
            FROM product_image
            WHERE id = #{productId}
            """)
    String selectFileName(Integer productId);

    @Delete("""
            DELETE FROM product_image
            WHERE product_id = #{productId}
            """)
    int deleteImage(Integer productId);

    @Update("""
            UPDATE product_image
            SET name = #{newFileName}, path = #{path}
            WHERE product_id = #{productId}
            """)
    int update(String newFileName, String path, Integer productId);
}
