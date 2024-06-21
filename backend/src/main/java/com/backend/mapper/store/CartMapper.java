package com.backend.mapper.store;


import com.backend.domain.store.ProductCart;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface CartMapper {

    @Insert("""
            INSERT INTO product_cart(name, product_id, price, quantity, fileName, member_number,total_price)
            VALUES(#{name}, #{id}, #{price}, #{quantity}, #{fileName}, #{memberNumber}, #{price})
            """)
    int addCart(ProductCart productCart);

    @Select("""
            SELECT *
            FROM product_cart
            """)
    List<ProductCart> cartProductList();


    @Update("""
            UPDATE product_cart
            SET quantity = quantity +1
            WHERE id = #{id}
            """)
    int updateQuantity(Integer id);

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

    @Select("""
            SELECT *
            FROM product_cart
            WHERE id = #{checkCartId}
            """)
    List<ProductCart> cartDataByCheckCartId(Integer checkCartId);

    @Delete("""
            DELETE
            FROM product_cart
            WHERE id = #{checkCartId}
            """)
    int deleteCartByCheckCartId(Integer checkCartId);


    @Update("""
            UPDATE product_cart
            SET quantity = #{quantity}, total_price = #{totalPrice}
            WHERE id = #{id}
            """)
    int modifyQuantity(ProductCart productCart);

    @Select("""
            SELECT quantity
            FROM product_cart
            WHERE id = #{cartId}
            """)
    Integer getQuantity(Integer cartId);


    @Select("""
            SELECT product_id
            FROM product_cart
            WHERE id = #{cartId}
            """)
    Integer getProductId(Integer cartId);
}
