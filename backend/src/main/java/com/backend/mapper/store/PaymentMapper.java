package com.backend.mapper.store;

import com.backend.domain.store.Payment;
import com.backend.domain.store.ProductOrder;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

import java.util.List;

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

    @Select("""
            select p.order_number,
                   p.amount,
                   p.buyer_name,
                   p.buyer_date,
                   po.name,
                   po.quantity,
                   po.total_price,
                   po.order_date
            from payment p
                     join product_order po
                          on po.payment_id = p.id
            where p.member_number = #{memberNumber}
            order by p.buyer_date desc
            limit #{limitData};
            """)
    List<ProductOrder> getData(Integer memberNumber, int limitData);
}
