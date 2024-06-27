package com.backend.mapper.promotion;

import com.backend.domain.promotion.Promo;
import com.backend.domain.promotion.PromoResult;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface PromoResultMapper {
    @Insert("""
            INSERT INTO promotion_result (promotion_id, announcement_date, winners)
            VALUES (#{promotionId}, #{announcementDate}, #{winnersJson})
            """)
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insertPromotionResult(PromoResult promoResult);

    @Insert("""
            INSERT INTO promo_winner (promotion_result_id, member_id)
            VALUES (#{promotionResultId}, (SELECT number FROM member WHERE email = #{email} AND nick_name = #{nickName}))
            """)
    int insertWinner(int promotionResultId, String email, String nickName);

    @Select("""
            SELECT eventType, title FROM promo
            WHERE id = #{promotionId}
            """)
    Promo getPromotionById(int promotionId);

    @Select("""
            SELECT pr.id, pr.promotion_id, pr.announcement_date, pr.winners as winnersJson,
                   p.eventType as eventType, p.title as eventName
            FROM promotion_result pr
            JOIN promo p ON pr.promotion_id = p.id
            LIMIT #{offset}, #{pageSize}
            """)
    List<PromoResult> selectPromotionResults(int offset, int pageSize);

    @Select("""
            SELECT COUNT(*) FROM promotion_result
            """)
    int countPromotionResults();

    @Delete("""
            DELETE FROM promotion_result
            WHERE promotion_id = #{promotionId}
            """)
    int deletePromotionResult(int promotionId);

    @Select("""
            SELECT pr.id, pr.promotion_id, pr.announcement_date, pr.winners as winnersJson,
                   p.eventType, p.title as eventName
            FROM promotion_result pr
            JOIN promo p ON pr.promotion_id = p.id
            WHERE pr.promotion_id = #{promotionId}
            """)
    PromoResult selectPromotionResultByPromotionId(Integer promotionId);

    @Update("""
            UPDATE promotion_result
            SET promotion_id = #{promotionResult.promotionId},
                announcement_date = #{promotionResult.announcementDate},
                winners = #{promotionResult.winnersJson}
            WHERE promotion_id = #{id}
            """)
    int updatePromotionResult(int id, PromoResult promoResult);

    @Select("""
            SELECT *
            FROM promotion_result
            WHERE id = #{id}
            """)
    PromoResult selectPromotionResultById(int id);
}
