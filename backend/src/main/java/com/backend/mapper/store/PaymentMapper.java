package com.backend.mapper.store;

import com.backend.domain.store.Payment;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface PaymentMapper {


    @Insert("""
            INSERT INTO payment(order_number, status, amount, buyer_name, buyer_email, success, member_number, qr_code)
            VALUES(#{orderNumber}, #{status}, #{amount}, #{buyerName}, #{buyerEmail}, #{success}, #{memberNumber}, #{qrCode})
            """)
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int add(Payment payment);

    @Select("""
            SELECT *
            FROM payment
            WHERE id = #{id}
            """)
    Payment paymentInfo(Integer id);

    @Select("""
            select p.order_number,
                   p.amount,
                   p.buyer_name,
                   p.buyer_date,
                   p.qr_code,
                   po.name as name,
                   po.quantity as quantity,
                   po.total_price as totalPrice,
                   po.order_date as orderDate
            from payment p
                     join product_order po
                          on po.payment_id = p.id
            where p.member_number = #{memberNumber}
              and p.id = #{paymentId}
            """)
    List<Payment> getData(Integer memberNumber, Integer paymentId);

    @Select("""
            SELECT p.*, po.quantity as quantity
            FROM payment p JOIN product_order po
            ON p.id = po.payment_id
            WHERE order_number = #{orderNumber}
            """)
    Payment paymentData(String orderNumber);


    @Update("""
            UPDATE payment
            SET status = #{status}
            WHERE order_number = #{orderNumber}
            """)
    int updatePaymentStatus(Payment payment);
}
