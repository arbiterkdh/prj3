package com.backend.controller.promotion;

import com.backend.domain.promotion.Promo;
import com.backend.service.promotion.PromoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/promotion")
@RequiredArgsConstructor
public class PromoController {

    private final PromoService promoService;

    @PostMapping("add")
    public ResponseEntity addPromo(Promo promo, @RequestParam(value = "files[]", required = false) MultipartFile[] files) throws IOException {
        if (promoService.validate(promo)) {
            promoService.addPromo(promo, files);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("list")
    public Map<String, Object> listPromo(@RequestParam(defaultValue = "1") Integer page,
                                         @RequestParam(required = false) Integer pageSize,
                                         @RequestParam(defaultValue = "") String type,
                                         @RequestParam(defaultValue = "") String search) {
        return promoService.listPromo(page, pageSize, type, search);
    }

    @GetMapping("list-all")
    public Map<String, Object> listAllWithoutPaging(@RequestParam(defaultValue = "") String search) {
        return promoService.listAllWithoutPaging(search);
    }

    @GetMapping("{id}")
    public ResponseEntity getPromo(@PathVariable Integer id) {
        Promo promo = promoService.get(id);
        if (promo == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(promo);
    }

    @DeleteMapping("{id}")
    public void deletePromo(@PathVariable Integer id) {
        promoService.promoRemove(id);
    }

    @PutMapping("modify")
    public ResponseEntity modifyPromo(Promo promo,
                                      @RequestParam(value = "removeFileList[]", required = false) List<String> removeFileList,
                                      @RequestParam(value = "addFileList[]", required = false) MultipartFile[] addFileList) throws IOException {
        Promo existingPromo = promoService.get(promo.getId());
        if (existingPromo == null) {
            return ResponseEntity.notFound().build();
        }
        promo.setIsRecommended(existingPromo.getIsRecommended());

        if (promoService.validate(promo)) {
            promoService.modify(promo, removeFileList, addFileList);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("{id}/add-recommendation")
    public ResponseEntity addRecommendation(@PathVariable Integer id) {
        try {
            promoService.addRecommendation(id);
            return ResponseEntity.ok().build();
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @PutMapping("{id}/remove-recommendation")
    public ResponseEntity removeRecommendation(@PathVariable Integer id) {
        promoService.updateRecommendation(id, false);
        return ResponseEntity.ok().build();
    }

    @PutMapping("{id}/enable-apply-button")
    public ResponseEntity enableApplyButton(@PathVariable Integer id) {
        promoService.updateApplyButtonVisibility(id, true);
        return ResponseEntity.ok().build();
    }

    @PutMapping("{id}/disable-apply-button")
    public ResponseEntity disableApplyButton(@PathVariable Integer id) {
        promoService.updateApplyButtonVisibility(id, false);
        return ResponseEntity.ok().build();
    }

    @GetMapping("recommendations")
    public ResponseEntity<List<Promo>> getRecommendations() {
        List<Promo> recommendedPromos = promoService.getRecommendedPromotions();
        return ResponseEntity.ok(recommendedPromos);
    }

    @GetMapping("list-apply-button-visible")
    public ResponseEntity<List<Promo>> getPromosWithVisibleApplyButton() {
        List<Promo> promos = promoService.getPromotionsWithVisibleApplyButton();
        return ResponseEntity.ok(promos);
    }
}
