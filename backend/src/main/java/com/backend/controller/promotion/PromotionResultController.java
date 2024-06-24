package com.backend.controller.promotion;

import com.backend.domain.promotion.PromotionResult;
import com.backend.service.promotion.PromotionResultService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/promotion/eventResult")
@RequiredArgsConstructor
public class PromotionResultController {

    private final PromotionResultService promotionResultService;

    @PostMapping
    public ResponseEntity<Void> addPromoResult(@RequestBody PromotionResult promotionResult) {
        promotionResultService.addPromoResult(promotionResult);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getPromoResults(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int pageSize) {
        Map<String, Object> results = promotionResultService.getPromoResults(page, pageSize);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/{promotionId}")
    public ResponseEntity<PromotionResult> getPromoResultByPromotionId(@PathVariable Integer promotionId) {
        PromotionResult result = promotionResultService.getPromoResultByPromotionId(promotionId);
        return ResponseEntity.ok(result);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updatePromoResult(@PathVariable Integer id, @RequestBody PromotionResult promotionResult) {
        promotionResultService.updatePromoResult(id, promotionResult);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePromoResult(@PathVariable Integer id) {
        promotionResultService.deletePromoResult(id);
        return ResponseEntity.ok().build();
    }
}
