package com.backend.mapper.member;

import com.backend.domain.member.Member;
import com.backend.domain.store.Payment;
import com.backend.domain.store.PaymentCancel;
import com.backend.domain.store.ProductOrder;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface MemberMapper {
    @Insert("""
            INSERT INTO member
            ( email, password, nick_name)
            VALUES (#{email}, #{password}, #{nickName})
            """)
    int insert(Member member);

    @Select("""
            SELECT *
            FROM member
            WHERE email = #{email}
            """)
    Member selectByEmail(String email);

    @Select("""
            SELECT *
            FROM member
            WHERE nick_name = #{nickName}
            """)
    Member selectByNickName(String nickName);

    @Select("""
            SELECT email, nick_name
            FROM member
            """)
    List<Member> findAllMembers();

    @Select("""
            SELECT name
            FROM authority
            WHERE member_id = #{memberId}
            """)
    List<String> selectAuthorityByMemberId(Integer memberId);

    @Update("""
            UPDATE member
            SET password = #{password}
            WHERE email = #{email}
            """)
    int updatePassword(Member member);


    @Select("""
            select p.id, p.order_number, p.status, p.buyer_date, p.amount, p.qr_code, p.buyer_name, po.name as name, po.quantity as quantity, po.price as price, po.total_price as totalPrice, po.product_id as productId
                                     from payment p
                                              join product_order po
                                                   on po.payment_id = p.id
                                     where p.buyer_name = #{nickName}
                                     group by order_date
                                     order by order_date desc
                                     limit #{offset}, 10
            """)
    List<Payment> paymentResult(String nickName, Integer offset);

    @Select("""
            SELECT COUNT(*)
            FROM payment
            WHERE buyer_name = #{nickName}
            """)
    Integer totalCount(String nickName);

    @Select("""
            SELECT *
            FROM payment_cancel
            WHERE requestor = #{nickName}
            order by id desc
            limit #{offset},10
            """)
    List<PaymentCancel> paymentCancelResult(String nickName, Integer offset);


    @Select("""
            SELECT name, quantity, price, total_price 
            FROM product_order
            WHERE payment_id = #{paymentId}
            """)
    List<ProductOrder> paymentOrderItem(Integer paymentId);


    @Select("""
            select distinct (po.name)      as cancelName,
                            po.quantity    as cancelQuantity,
                            po.price       as cancelPrice,
                            po.total_price as cancelTotalPrice,
                            pc.cancel_reason as cancelReason
            from payment_cancel pc
                     join payment p
                          on pc.order_number = p.order_number
                     join product_order po
                          on po.payment_id = p.id
            WHERE p.order_number = #{orderNumber}
            """)
    List<PaymentCancel> paymentCancelItem(String orderNumber);
}
