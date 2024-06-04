package com.backend.mapper.store;


import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ImageMapper {


    @Insert("""
            INSERT INTO product_image(name, path, product_id)
            VALUES(#{name}, #{path}, #{productId})
            """)
    int add(Integer productId, String name, String path);
}
