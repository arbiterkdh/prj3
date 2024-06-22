package com.backend.mapper.promotion;

import com.backend.domain.promotion.Promotion;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface PromotionMapper {

    @Insert("""
            INSERT INTO promo
            (id, title, eventType, eventStartDate, eventEndDate, content, isRecommended)
            VALUES (#{id}, #{title}, #{eventType}, #{eventStartDate}, #{eventEndDate}, #{content}, #{isRecommended})
            """)
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insertPromo(Promotion promotion);

    @Select("""
            SELECT *
            FROM promo
            ORDER BY id DESC
            """)
    List<Promotion> selectList();

    @Select("""
            SELECT *
            FROM promo
            WHERE id = #{id}
            """)
    Promotion selectById(int id);

    @Delete("""
            DELETE FROM promo
            WHERE id = #{id}
            """)
    int deleteById(int id);

    @Update("""
            UPDATE promo
            SET title = #{title},
                eventType = #{eventType},
                eventStartDate = #{eventStartDate},
                eventEndDate = #{eventEndDate},
                content = #{content},
                isRecommended = #{isRecommended}
            WHERE id = #{id}
            """)
    int update(Promotion promotion);

    @Insert("""
            INSERT INTO promo_file (promo_id, name)
            VALUES (#{promoId}, #{name})
            """)
    int insertFileName(int promoId, String name);

    @Select("""
            SELECT name
            FROM promo_file
            WHERE promo_id=#{promoId}
            """)
    List<String> selectFileNameByPromoId(int promoId);

    @Delete("""
            DELETE FROM promo_file
            WHERE promo_id=#{promoId}
            """)
    int deleteFileByPromoId(int promoId);

    @Delete("""
            DELETE FROM promo_file
            WHERE promo_id=#{promoId}
              AND name=#{fileName}
            """)
    int deleteFileByPromoIdAndName(int promoId, String fileName);

    @Select("""
            SELECT COUNT(*)
            FROM promo
            WHERE eventEndDate >= CURRENT_DATE
            AND eventType = #{type}
            AND (title LIKE CONCAT('%', #{search}, '%') OR content LIKE CONCAT('%', #{search}, '%'))
            """)
    int countAllExcludingEnded(String type, String search);

    @Select("""
            SELECT *
            FROM promo
            WHERE eventEndDate >= CURRENT_DATE
            AND eventType = #{type}
            AND (title LIKE CONCAT('%', #{search}, '%') OR content LIKE CONCAT('%', #{search}, '%'))
            ORDER BY id DESC
            LIMIT #{offset}, #{pageSize}
            """)
    List<Promotion> selectAllPagingExcludingEnded(int offset, int pageSize, String type, String search);

    @Select("""
            SELECT COUNT(*)
            FROM promo
            WHERE eventEndDate < CURRENT_DATE
            AND (title LIKE CONCAT('%', #{search}, '%') OR content LIKE CONCAT('%', #{search}, '%'))
            """)
    int countAllEnded(String search);

    @Select("""
            SELECT *
            FROM promo
            WHERE eventEndDate < CURRENT_DATE
            AND (title LIKE CONCAT('%', #{search}, '%') OR content LIKE CONCAT('%', #{search}, '%'))
            ORDER BY id DESC
            LIMIT #{offset}, #{pageSize}
            """)
    List<Promotion> selectAllPagingEnded(int offset, int pageSize, String search);

    @Select("""
            SELECT COUNT(*)
            FROM promo
            WHERE title LIKE CONCAT('%', #{search}, '%') OR content LIKE CONCAT('%', #{search}, '%')
            """)
    int countAll(String search);

    @Select("""
            SELECT *
            FROM promo
            WHERE title LIKE CONCAT('%', #{search}, '%') OR content LIKE CONCAT('%', #{search}, '%')
            ORDER BY id DESC
            LIMIT #{offset}, #{pageSize}
            """)
    List<Promotion> selectAllPaging(int offset, int pageSize, String search);

    @Select("""
        SELECT *
        FROM promo
        WHERE title LIKE CONCAT('%', #{search}, '%') OR content LIKE CONCAT('%', #{search}, '%')
        ORDER BY id DESC
        """)
    List<Promotion> selectAllWithoutPaging(String search);

    @Update("""
            UPDATE promo
            SET isRecommended = #{isRecommended}
            WHERE id = #{id}
            """)
    void updateRecommendation(Integer id, boolean isRecommended);

    @Select("""
            SELECT *
            FROM promo
            WHERE isRecommended = true
            """)
    List<Promotion> selectRecommendedPromotions();
}
