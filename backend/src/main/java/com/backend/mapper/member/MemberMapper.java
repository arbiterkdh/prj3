package com.backend.mapper.member;

import com.backend.domain.member.Member;
import com.backend.domain.store.Payment;
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
            select p.order_number, p.buyer_date, p.amount, p.qr_code, po.name as name, po.quantity as quantity, po.price as price, po.total_price as totalPrice
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
}
