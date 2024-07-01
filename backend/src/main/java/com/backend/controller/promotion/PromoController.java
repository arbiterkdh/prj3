package com.backend.controller.promotion;

import com.backend.domain.promotion.Promo;
import com.backend.service.promotion.PromoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
    @PreAuthorize("hasAuthority('SCOPE_admin')")
    public ResponseEntity addPromo(Promo promo, @RequestParam(value = "promoDetailFile", required = false) MultipartFile[] promoDetailFile,
                                   @RequestParam(value = "promoRecommendedFile", required = false) MultipartFile[] promoRecommendedFile,
                                   @RequestParam(value = "promoThumbnailFile", required = false) MultipartFile[] promoThumbnailFile) throws IOException {
        if (promoService.validate(promo)) {
            promoService.addPromo(promo, promoDetailFile, promoRecommendedFile, promoThumbnailFile);
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
    @PreAuthorize("hasAuthority('SCOPE_admin')")
    public void deletePromo(@PathVariable Integer id) {
        promoService.promoRemove(id);
    }

    @PutMapping("modify")
    @PreAuthorize("hasAuthority('SCOPE_admin')")
    public ResponseEntity modifyPromo(Promo promo,
                                      @RequestParam(value = "removeFileList[]", required = false) List<String> removeFileList,
                                      @RequestParam(value = "addDetailFiles", required = false) MultipartFile[] addDetailFiles,
                                      @RequestParam(value = "addRecommendedFiles", required = false) MultipartFile[] addRecommendedFiles,
                                      @RequestParam(value = "addThumbnailFiles", required = false) MultipartFile[] addThumbnailFiles) throws IOException {
        Promo existingPromo = promoService.get(promo.getId());
        if (existingPromo == null) {
            return ResponseEntity.notFound().build();
        }
        promo.setIsRecommended(existingPromo.getIsRecommended());

        if (promoService.validate(promo)) {
            promoService.modify(promo, removeFileList, addDetailFiles, addRecommendedFiles, addThumbnailFiles);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("{id}/add-recommendation")
    @PreAuthorize("hasAuthority('SCOPE_admin')")
    public ResponseEntity addRecommendation(@PathVariable Integer id) {
        try {
            promoService.addRecommendation(id);
            return ResponseEntity.ok().build();
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @PutMapping("{id}/remove-recommendation")
    @PreAuthorize("hasAuthority('SCOPE_admin')")
    public ResponseEntity removeRecommendation(@PathVariable Integer id) {
        promoService.updateRecommendation(id, false);
        return ResponseEntity.ok().build();
    }

    @GetMapping("recommendations")
    public ResponseEntity<List<Promo>> getRecommendations() {
        List<Promo> recommendedPromos = promoService.getRecommendedPromotions();
        return ResponseEntity.ok(recommendedPromos);
    }
}