package com.backend.mapper.store;

import com.backend.domain.store.Product;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ProductMapper {


    @Insert("""
            INSERT INTO product(name, content, price, stock)
            VALUES (#{name}, #{content}, #{price}, #{stock})
            """)
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int add(Product product);

    @Select(""" 
            SELECT p.id, p.name, p.price, pi.path as path, p.stock, pi.name fileName
            FROM product p
                     JOIN product_image pi
                          ON p.id = pi.product_id
            """)
    List<Product> productList();

}
