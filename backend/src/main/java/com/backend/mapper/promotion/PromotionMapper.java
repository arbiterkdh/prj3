package com.backend.mapper.promotion;

import com.backend.domain.promotion.Promotion;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PromotionMapper {

    @Insert("""
            INSERT INTO promo
            (id, title, content)
            VALUES (#{id}, #{title}, #{content})
            """)
    int insertPromo(Promotion promotion);
}
