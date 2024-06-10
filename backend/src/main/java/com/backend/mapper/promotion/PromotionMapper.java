package com.backend.mapper.promotion;

import com.backend.domain.promotion.Promotion;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface PromotionMapper {

    @Insert("""
            INSERT INTO promo
            (id, title, eventType, eventStartDate, eventEndDate, content)
            VALUES (#{id}, #{title}, #{eventType}, #{eventStartDate}, #{eventEndDate}, #{content})
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
    Promotion selectById(Integer id);

    @Insert("""
            INSERT INTO promo_file (promo_id, name)
            VALUES (#{promoId}, #{name})
            """)
    int insertFileName(Integer promoId, String name);
}