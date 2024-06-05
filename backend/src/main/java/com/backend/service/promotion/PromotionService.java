package com.backend.service.promotion;

import com.backend.domain.promotion.Promotion;
import com.backend.mapper.promotion.PromotionMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class PromotionService {

    private final PromotionMapper promotionMapper;

    public void addPromo(Promotion promotion) {
        promotionMapper.insertPromo(promotion);
    }
}
