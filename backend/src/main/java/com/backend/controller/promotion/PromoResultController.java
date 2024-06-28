package com.backend.controller.promotion;

import com.backend.domain.promotion.PromoResult;
import com.backend.service.promotion.PromoResultService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/promotion/eventResult")
@RequiredArgsConstructor
public class PromoResultController {

    private final PromoResultService promoResultService;

    @PostMapping
    public ResponseEntity<Void> addPromoResult(@RequestBody PromoResult promoResult) {
        promoResultService.addPromoResult(promoResult);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getPromoResults(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(required = false) Integer memberNumber) { // 멤버 번호 파라미터 추가
        Map<String, Object> results = promoResultService.getPromoResults(page, pageSize, memberNumber);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/{promotionId}")
    public ResponseEntity<PromoResult> getPromoResultByPromotionId(@PathVariable Integer promotionId) {
        PromoResult result = promoResultService.getPromoResultByPromotionId(promotionId);
        return ResponseEntity.ok(result);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updatePromoResult(@PathVariable Integer id, @RequestBody PromoResult promoResult) {
        promoResultService.updatePromoResult(id, promoResult);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePromoResult(@PathVariable Integer id) {
        promoResultService.deletePromoResult(id);
        return ResponseEntity.ok().build();
    }
}
