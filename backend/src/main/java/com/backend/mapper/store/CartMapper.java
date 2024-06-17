package com.backend.mapper.store;


import com.backend.domain.store.ProductCart;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface CartMapper {

    @Insert("""
            INSERT INTO product_cart(name, product_id, price, quantity, fileName)
            VALUES(#{name}, #{id}, #{price}, #{quantity}, #{fileName} )
            """)
    int addCart(ProductCart productCart);

    @Select("""
            SELECT *
            FROM product_cart
            """)
    List<ProductCart> cartProductList();


    @Update("""
            UPDATE product_cart
            SET quantity = #{quantity} +1
            WHERE product_id = #{productId}
            """)
    int updateQuantity(Integer quantity, Integer productId);

    @Select("""
            SELECT *
            FROM product_cart
            WHERE product_id = #{productId}
            """)
    ProductCart getExistItem(Integer productId);


    @Delete("""
            DELETE FROM product_cart
            WHERE product_id = #{productId}
            """)
    int deleteItem(Integer productId);

    @Select("""
            SELECT fileName
            FROM product_cart
            WHERE product_id = #{productId}
            """)
    String selectFileName(Integer productId);
}
