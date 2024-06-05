package com.backend.mapper.store;


import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

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
}
