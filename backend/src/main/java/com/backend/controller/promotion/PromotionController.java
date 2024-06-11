package com.backend.controller.promotion;

import com.backend.domain.promotion.Promotion;
import com.backend.service.promotion.PromotionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/promotion")
@RequiredArgsConstructor
public class PromotionController {

    private final PromotionService promotionService;

    @PostMapping("/add")
    public ResponseEntity addPromo(Promotion promotion, @RequestParam(value = "files[]", required = false) MultipartFile[] files) throws IOException {

        if (promotionService.validate(promotion)) {
            promotionService.addPromo(promotion, files);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/list")
    public List<Promotion> listPromotion() {
        return promotionService.list();
    }

    @GetMapping("{id}")
    public ResponseEntity getPromotion(@PathVariable Integer id) {
        Promotion promotion = promotionService.get(id);

        if (promotion == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(promotion);
    }

    @DeleteMapping("{id}")
    public void deletePromotion(@PathVariable Integer id) {
        promotionService.remove(id);
    }

    @PutMapping("modify")
    public ResponseEntity modifyPromotion(@RequestBody Promotion promotion) {
        if (promotionService.validate(promotion)) {
            promotionService.modify(promotion);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }
}
