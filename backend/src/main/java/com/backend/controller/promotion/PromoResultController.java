package com.backend.controller.promotion;

import com.backend.domain.promotion.PromoResult;
import com.backend.service.promotion.PromoResultService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/promotion/eventResult")
@RequiredArgsConstructor
public class PromoResultController {

    private final PromoResultService promoResultService;

    @PostMapping
    @PreAuthorize("hasAuthority('SCOPE_admin')")
    public ResponseEntity<Void> addPromoResult(@RequestBody PromoResult promoResult) {
        promoResultService.addPromoResult(promoResult);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getPromoResults(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int pageSize) {
        Map<String, Object> results = promoResultService.getPromoResults(page, pageSize);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/{promotionId}")
    public ResponseEntity<PromoResult> getPromoResultByPromotionId(@PathVariable Integer promotionId) {
        PromoResult result = promoResultService.getPromoResultByPromotionId(promotionId);
        return ResponseEntity.ok(result);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('SCOPE_admin')")
    public ResponseEntity<Void> updatePromoResult(@PathVariable Integer id, @RequestBody PromoResult promoResult) {
        promoResultService.updatePromoResult(id, promoResult);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{promotionId}")
    @PreAuthorize("hasAuthority('SCOPE_admin')")
    public ResponseEntity<Void> deletePromoResult(@PathVariable Integer promotionId) {
        promoResultService.deletePromoResultById(promotionId);
        return ResponseEntity.ok().build();
    }
}
