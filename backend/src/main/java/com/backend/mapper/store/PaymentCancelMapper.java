package com.backend.mapper.store;

import com.backend.domain.store.PaymentCancel;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface PaymentCancelMapper {


    @Insert("""
            INSERT INTO payment_cancel(order_number, payment_id, cancel_reason, requestor, amount, cancelled_at, receipt_url, card_name, name, imp_uid, card_number)
            VALUES (#{orderNumber}, #{paymentId}, #{cancelReason}, #{requestor}, #{amount}, #{cancelledAt}, #{receiptUrl}, #{cardName}, #{name}, #{impUid}, #{cardNumber})
            """)
    int insert(PaymentCancel paymentCancel);


    @Select("""
            SELECT COUNT(*)
            FROM payment_cancel
            WHERE requestor = #{nickName}
            """)
    int totalCount(String nickName);
}
