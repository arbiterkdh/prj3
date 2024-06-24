package com.backend.service.promotion;

import com.backend.domain.promotion.PromotionResult;
import com.backend.mapper.promotion.PromotionResultMapper;
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
public class PromotionResultService {
    private final PromotionResultMapper promotionResultMapper;
    private final ObjectMapper objectMapper;

    public void addPromoResult(PromotionResult promotionResult) {
        try {
            String winnersJson = objectMapper.writeValueAsString(promotionResult.getWinners());
            promotionResult.setWinnersJson(winnersJson);
            promotionResultMapper.insertPromotionResult(promotionResult);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to serialize winners list", e);
        }
    }

    public Map<String, Object> getPromoResults(int page, int pageSize) {
        int totalItems = promotionResultMapper.countPromotionResults();
        int offset = (page - 1) * pageSize;
        List<PromotionResult> results = promotionResultMapper.selectPromotionResults(offset, pageSize);
        results.forEach(result -> deserializeWinners(result));

        Map<String, Object> response = new HashMap<>();
        response.put("results", results);
        response.put("pageInfo", createPageInfo(page, totalItems, pageSize));

        return response;
    }

    public PromotionResult getPromoResultByPromotionId(int promotionId) {
        PromotionResult result = promotionResultMapper.selectPromotionResultByPromotionId(promotionId);
        if (result != null) {
            deserializeWinners(result);
        }
        return result;
    }

    public void updatePromoResult(int id, PromotionResult promotionResult) {
        try {
            String winnersJson = objectMapper.writeValueAsString(promotionResult.getWinners());
            promotionResult.setWinnersJson(winnersJson);
            int rowsAffected = promotionResultMapper.updatePromotionResult(id, promotionResult);
            if (rowsAffected == 0) {
                throw new RuntimeException("Update failed, no rows affected.");
            }
            // 업데이트 후 결과 확인 로그 추가
            PromotionResult updatedResult = promotionResultMapper.selectPromotionResultById(id);
            System.out.println("Updated Promotion Result from DB: " + updatedResult);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to serialize winners list", e);
        }
    }

    public void deletePromoResult(int id) {
        promotionResultMapper.deletePromotionResult(id);
    }

    private Map<String, Object> createPageInfo(int page, int countAll, int pageSize) {
        int lastPageNumber = (countAll - 1) / pageSize + 1;
        int leftPageNumber = (page - 1) / 10 * 10 + 1;
        int rightPageNumber = Math.min(leftPageNumber + 9, lastPageNumber);

        Map<String, Object> pageInfo = new HashMap<>();
        if (leftPageNumber > 1) {
            pageInfo.put("prevPageNumber", leftPageNumber - 1);
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

    private void deserializeWinners(PromotionResult result) {
        try {
            List<PromotionResult.Winner> winners = objectMapper.readValue(result.getWinnersJson(), new TypeReference<List<PromotionResult.Winner>>() {
            });
            result.setWinners(winners);
        } catch (IOException e) {
            throw new RuntimeException("Failed to deserialize winners list", e);
        }
    }
}
