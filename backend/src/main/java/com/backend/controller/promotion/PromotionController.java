package com.backend.controller.promotion;

import com.backend.domain.promotion.Promotion;
import com.backend.service.promotion.PromotionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/promotion")
@RequiredArgsConstructor
public class PromotionController {

    private final PromotionService promotionService;

    @PostMapping("/add")
    public void addPromo(@RequestParam Promotion promotion) {

        promotionService.addPromo(promotion);
    }
}
