package com.backend.mapper.store;

import com.backend.domain.store.Product;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;

@Mapper
public interface ProductMapper {


    @Insert("""
            INSERT INTO product(name, content, price, stock)
            VALUES (#{name}, #{content}, #{price}, #{stock})
            """)
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int add(Product product);
}
