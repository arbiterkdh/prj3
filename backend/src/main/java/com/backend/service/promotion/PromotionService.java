package com.backend.service.promotion;

import com.backend.domain.promotion.Promotion;
import com.backend.mapper.promotion.PromotionMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class PromotionService {

    private final PromotionMapper promotionMapper;

    public void addPromo(Promotion promotion, MultipartFile[] files) {
        promotionMapper.insertPromo(promotion);

        if (files != null) {
            for (MultipartFile file : files) {
                promotionMapper.insertFileName(promotion.getId(), file.getOriginalFilename());
            }
        }

    }

    public boolean validate(Promotion promotion) {
        if (promotion.getTitle() == null || promotion.getTitle().isBlank()) {
            return false;
        }
        if (promotion.getEventType() == null) {
            return false;
        }
        if (promotion.getEventStartDate() == null) {
            return false;
        }
        if (promotion.getEventEndDate() == null) {
            return false;
        }
        if (promotion.getContent() == null || promotion.getContent().isBlank()) {
            return false;
        }
        return true;
    }

    public List<Promotion> list() {
        return promotionMapper.selectList();
    }

    public Promotion get(Integer id) {
        return promotionMapper.selectById(id);
    }

    public void remove(Integer id) {
        promotionMapper.deleteById(id);
    }

    public void modify(Promotion promotion) {
        promotionMapper.update(promotion);
    }
}
