package com.backend.mapper.store;


import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ProductOrderMapper {

    @Insert("""
            insert into product_order(payment_id, name, file_name, product_id, quantity, price, reg_date, member_number, total_price)
            SELECT #{paymentId}, name, fileName, product_id, quantity, price, reg_date, member_number, total_price from product_cart WHERE id = #{cartId}
            """)
    int copyCartData(Integer cartId, Integer paymentId);

    @Insert("""
            INSERT INTO product_order(product_id, quantity, payment_id, name, price, total_price, member_number)
            VALUES(#{productId}, #{quantity}, #{paymentId}, #{name}, #{price}, #{totalPrice}, #{memberNumber})
            """)
    int addSinggleProductOrder(Integer productId, Integer quantity, Integer paymentId, String name, Long price, Long totalPrice, Integer memberNumber);

    @Delete("""
            DELETE FROM product_order
            WHERE payment_id = #{paymentId}
            """)
    int deleteOrder(Integer paymentId);
}
