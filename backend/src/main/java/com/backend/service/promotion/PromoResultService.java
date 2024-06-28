package com.backend.service.promotion;

import com.backend.domain.promotion.PromoResult;
import com.backend.mapper.promotion.PromoResultMapper;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
public class PromoResultService {
    private final PromoResultMapper promoResultMapper;
    private final ObjectMapper objectMapper;

    public void addPromoResult(PromoResult promoResult) {
        try {
            String winnersJson = objectMapper.writeValueAsString(promoResult.getWinners());
            promoResult.setWinnersJson(winnersJson);
            promoResultMapper.insertPromoResult(promoResult);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to serialize winners list", e);
        }
    }

    public Map<String, Object> getPromoResults(int page, Integer pageSize) {
        if (pageSize == null) {
            pageSize = 10; // 기본값을 10으로 설정
        }

        int totalItems = promoResultMapper.countPromoResults();
        int offset = (page - 1) * pageSize;
        List<PromoResult> results = promoResultMapper.selectPromoResults(offset, pageSize);
        results.forEach(result -> deserializeWinners(result));

        Map<String, Object> response = new HashMap<>();
        response.put("results", results);
        response.put("pageInfo", createPageInfo(page, totalItems, pageSize));

        return response;
    }

    public PromoResult getPromoResultByPromotionId(int promotionId) {
        PromoResult result = promoResultMapper.selectPromoResultByPromotionId(promotionId);
        if (result != null) {
            deserializeWinners(result);
        }
        return result;
    }

    public void updatePromoResult(int id, PromoResult promoResult) {
        try {
            String winnersJson = objectMapper.writeValueAsString(promoResult.getWinners());
            promoResult.setWinnersJson(winnersJson);
            int rowsAffected = promoResultMapper.updatePromoResult(id, promoResult);
            if (rowsAffected == 0) {
                throw new RuntimeException("Update failed, no rows affected.");
            }
            // 업데이트 후 결과 확인 로그 추가
            PromoResult updatedResult = promoResultMapper.selectPromoResultById(id);
            System.out.println("Updated Promotion Result from DB: " + updatedResult);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to serialize winners list", e);
        }
    }

    public void deletePromoResult(int id) {
        promoResultMapper.deletePromoResult(id);
    }

    private Map<String, Object> createPageInfo(int page, int countAll, int pageSize) {
        int lastPageNumber = (countAll - 1) / pageSize + 1;
        int leftPageNumber = (page - 1) / 10 * 10 + 1;
        int rightPageNumber = Math.min(leftPageNumber + 9, lastPageNumber);

        Map<String, Object> pageInfo = new HashMap<>();
        if (leftPageNumber > 1) {
            pageInfo.put("prevPageNumber", leftPageNumber - 10);
        }
        if (rightPageNumber < lastPageNumber) {
            pageInfo.put("nextPageNumber", rightPageNumber + 1);
        }
        pageInfo.put("currentPageNumber", page);
        pageInfo.put("lastPageNumber", lastPageNumber);
        pageInfo.put("leftPageNumber", leftPageNumber);
        pageInfo.put("rightPageNumber", rightPageNumber);
        pageInfo.put("totalItems", countAll);

        return pageInfo;
    }

    private void deserializeWinners(PromoResult result) {
        try {
            List<PromoResult.Winner> winners = objectMapper.readValue(result.getWinnersJson(), new TypeReference<List<PromoResult.Winner>>() {
            });
            result.setWinners(winners);
        } catch (IOException e) {
            throw new RuntimeException("Failed to deserialize winners list", e);
        }
    }
}
