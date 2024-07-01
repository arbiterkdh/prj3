package com.backend.mapper.store;


import com.backend.domain.store.ProductCart;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface CartMapper {

    @Insert("""
            INSERT INTO product_cart(name, product_id, price, quantity, fileName, member_number,total_price)
            VALUES(#{name}, #{productId}, #{price}, #{quantity}, #{fileName}, #{memberNumber}, #{price})
            """)
    int addCart(ProductCart productCart);

    @Select("""
            SELECT *
            FROM product_cart
            WHERE member_number = #{memberNumber}
            """)
    List<ProductCart> cartProductList(Integer memberNumber);


    @Update("""
            UPDATE product_cart
            SET quantity = quantity +1
            WHERE product_id = #{productId} and member_number = #{memberNumber}
            """)
    int updateQuantity(Integer productId, Integer memberNumber);

    @Select("""
            SELECT *
            FROM product_cart
            WHERE member_number = #{memberNumber} and product_id = #{productId}
            """)
    ProductCart getExistItem(Integer memberNumber, Integer productId);


    @Delete("""
            DELETE FROM product_cart
            WHERE product_id = #{productId} and member_number = #{memberNumber}
            """)
    int deleteItem(Integer productId, Integer memberNumber);

    @Select("""
            SELECT fileName
            FROM product_cart
            WHERE product_id = #{productId} and member_number = #{memberNumber}
            """)
    String selectFileName(Integer productId, Integer memberNumber);

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


    @Select("""
            SELECT COUNT(*)
            FROM product_cart
            WHERE member_number = #{memberNumber}
            """)
    Integer totalCount(Integer memberNumber);
}
