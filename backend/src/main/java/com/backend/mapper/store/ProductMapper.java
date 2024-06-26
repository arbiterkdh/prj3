package com.backend.mapper.store;

import com.backend.domain.store.Product;
import com.backend.domain.store.ProductType;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface ProductMapper {


    @Insert("""
            INSERT INTO product(name, content, price, stock, type)
            VALUES (#{name}, #{content}, #{price}, #{stock}, #{type})
            """)
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int add(Product product);

    @Select(""" 
            <script>
            SELECT p.id, p.name, p.price, p.stock, pi.name fileName, p.quantity
            FROM product p
                     JOIN product_image pi
                          ON p.id = pi.product_id
            <if test="menuTypeSelect != 'all'">
                     JOIN product_type pt
                          ON pt.id = p.type
            WHERE pt.id = #{menuTypeSelect}
            </if>
            ORDER BY p.id DESC
            LIMIT #{offset}, 12
            </script>
            """)
    List<Product> productList(String menuTypeSelect, Integer offset);


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
            SELECT p.id , p.name, p.content, p.stock, pi.name as fileName
            FROM product p
                     join product_image pi
                          on p.id = pi.product_id
            where p.id = #{id};
            """)
    Product info(Integer id);

    @Select("""
            SELECT *
            FROM product_type
            """)
    List<ProductType> typeList();

    @Select("""
            <script>
            SELECT COUNT(*)
            FROM product p
            <if test="menuTypeSelect != 'all'">
                     join product_type pt
                          ON p.type = pt.id
            WHERE p.type = #{menuTypeSelect};
            </if>
            </script>
            """)
    Integer totalCount(String menuTypeSelect);


    @Update("""
            UPDATE product
            SET stock = stock - #{getQuantity}
            WHERE id = #{productId}
            """)
    int updateStock(Integer productId, Integer getQuantity);

    @Update("""
            UPDATE product
            SET stock = stock + #{quantity}
            WHERE id = #{productId}
            """)
    int updateRefundStock(Integer productId, Integer quantity);
}
