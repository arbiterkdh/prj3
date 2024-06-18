package com.backend.mapper.store;


import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ProductOrderMapper {

    @Insert("""
            insert into product_order(payment_id, name, file_name, product_id, quantity, price, reg_date, member_number)
            SELECT #{paymentId}, name, fileName, product_id, quantity, price, reg_date, member_number from product_cart WHERE id = #{cartId}
            """)
    int copyCartData(Integer cartId, Integer paymentId);
}
