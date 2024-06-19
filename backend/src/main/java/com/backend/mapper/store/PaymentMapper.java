package com.backend.mapper.store;

import com.backend.domain.store.Payment;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface PaymentMapper {


    @Insert("""
            INSERT INTO payment(order_number, status, amount, buyer_name, buyer_email, success, member_number)
            VALUES(#{orderNumber}, #{status}, #{amount}, #{buyerName}, #{buyerEmail}, #{success}, #{memberNumber})
            """)
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int add(Payment payment);

    @Select("""
            SELECT *
            FROM payment
            WHERE id = #{id}
            """)
    Payment paymentInfo(Integer id);
}
