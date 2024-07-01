package com.backend.mapper.promotion;

import com.backend.domain.promotion.PromoResult;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface PromoResultMapper {
    @Insert("""
            INSERT INTO promo_result (promotion_id, announcement_date, winners)
            VALUES (#{promotionId}, #{announcementDate}, #{winnersJson})
            """)
    int insertPromoResult(PromoResult promoResult);

    @Select("""
            SELECT pr.id, pr.promotion_id, pr.announcement_date, pr.winners as winnersJson,
                   p.eventType as eventType, p.title as eventName
            FROM promo_result pr
            JOIN promo p ON pr.promotion_id = p.id
            LIMIT #{offset}, #{pageSize}
            """)
    List<PromoResult> selectPromoResults(int offset, int pageSize);

    @Select("""
            SELECT COUNT(*) FROM promo_result
            """)
    int countPromoResults();

    @Delete("""
            DELETE FROM promo_result WHERE id = #{id}
            """)
    int deletePromoResult(Integer id);

    @Select("""
            SELECT pr.id, pr.promotion_id, pr.announcement_date, pr.winners as winnersJson,
                   p.eventType, p.title as eventName
            FROM promo_result pr
            JOIN promo p ON pr.promotion_id = p.id
            WHERE pr.promotion_id = #{promotionId}
            """)
    PromoResult selectPromoResultByPromotionId(Integer promotionId);

    @Update("""
            UPDATE promo_result
            SET promotion_id = #{promoResult.promotionId},
                announcement_date = #{promoResult.announcementDate},
                winners = #{promoResult.winnersJson}
            WHERE promotion_id = #{id}
            """)
    int updatePromoResult(int id, PromoResult promoResult);

    @Select("""
            SELECT *
            FROM promo_result
            WHERE id = #{id}
            """)
    PromoResult selectPromoResultById(int id);
}
