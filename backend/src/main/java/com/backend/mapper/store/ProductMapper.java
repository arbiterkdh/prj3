package com.backend.mapper.store;

import com.backend.domain.store.Product;
import org.apache.ibatis.annotations.*;

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
            SELECT p.id, p.name, p.price, pi.path as path, p.stock, pi.name fileName, p.quantity
            FROM product p
                     JOIN product_image pi
                          ON p.id = pi.product_id
            """)
    List<Product> productList();


    @Delete("""
            DELETE FROM
            product
            WHERE id = #{id}
            """)
    int deleteProduct(Integer id);


    @Update("""
            UPDATE product
            SET name = #{product.name}, stock = #{product.stock}, price= #{product.price}
            WHERE id = #{productId}
            """)
    int updateProduct(Product product, Integer productId);

    @Select("""
            SELECT *
            FROM product
            WHERE id = #{id}
            """)
    Product info(Integer id);
}
