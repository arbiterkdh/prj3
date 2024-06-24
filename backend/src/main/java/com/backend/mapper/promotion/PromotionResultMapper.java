package com.backend.mapper.promotion;

import com.backend.domain.promotion.PromotionResult;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface PromotionResultMapper {
    @Insert("""
            INSERT INTO promotion_result (promotion_id, announcement_date, winners)
            VALUES (#{promotionId}, #{announcementDate}, #{winnersJson})
            """)
    int insertPromotionResult(PromotionResult promotionResult);

    @Select("""
            SELECT pr.id, pr.promotion_id, pr.announcement_date, pr.winners as winnersJson,
                   p.eventType as eventType, p.title as eventName
            FROM promotion_result pr
            JOIN promo p ON pr.promotion_id = p.id
            LIMIT #{offset}, #{pageSize}
            """)
    List<PromotionResult> selectPromotionResults(int offset, int pageSize);

    @Select("""
            SELECT COUNT(*) FROM promotion_result
            """)
    int countPromotionResults();

    @Delete("""
            DELETE FROM promotion_result WHERE id = #{id}
            """)
    int deletePromotionResult(Integer id);

    @Select("""
            SELECT pr.id, pr.promotion_id, pr.announcement_date, pr.winners as winnersJson,
                   p.eventType, p.title as eventName
            FROM promotion_result pr
            JOIN promo p ON pr.promotion_id = p.id
            WHERE pr.promotion_id = #{promotionId}
            """)
    PromotionResult selectPromotionResultByPromotionId(Integer promotionId);

    @Update("""
            UPDATE promotion_result
            SET promotion_id = #{promotionResult.promotionId},
                announcement_date = #{promotionResult.announcementDate},
                winners = #{promotionResult.winnersJson}
            WHERE promotion_id = #{id}
            """)
    int updatePromotionResult(int id, PromotionResult promotionResult);

    @Select("""
            SELECT *
            FROM promotion_result
            WHERE id = #{id}
            """)
    PromotionResult selectPromotionResultById(int id);
}
