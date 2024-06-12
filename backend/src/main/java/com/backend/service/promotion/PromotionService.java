package com.backend.service.promotion;

import com.backend.domain.promotion.Promotion;
import com.backend.domain.promotion.PromotionFile;
import com.backend.mapper.promotion.PromotionMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class PromotionService {

    private final PromotionMapper promotionMapper;

    public void addPromo(Promotion promotion, MultipartFile[] files) throws IOException {
        promotionMapper.insertPromo(promotion);

        if (files != null) {
            for (MultipartFile file : files) {
                promotionMapper.insertFileName(promotion.getId(), file.getOriginalFilename());

                String dir = STR."C:/Temp/prj3/\{promotion.getId()}";
                File dirFile = new File(dir);
                if (!dirFile.exists()) {
                    dirFile.mkdirs();
                }
                String path = STR."C:/Temp/prj3/\{promotion.getId()}/\{file.getOriginalFilename()}";
                File destination = new File(path);
                file.transferTo(destination);
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
        Promotion promotion = promotionMapper.selectById(id);
        List<String> fileNames = promotionMapper.selectFileNameByPromoId(id);

        List<PromotionFile> files = fileNames.stream()
                .map(name -> new PromotionFile(name, STR."http://172.30.1.3:8888/\{id}/\{name}"))
                .toList();

        promotion.setFileList(files);

        return promotion;
    }

    public void remove(Integer id) {
        List<String> fileNames = promotionMapper.selectFileNameByPromoId(id);

        String dir = STR."C:/Temp/prj3/\{id}";
        for (String fileName : fileNames) {
            File file = new File(dir, fileName);
            file.delete();
        }
        File dirfile = new File(dir);
        if (dirfile.exists()) {
            dirfile.delete();
        }
        promotionMapper.deleteFileByPromoId(id);
        promotionMapper.deleteById(id);
    }

    public void modify(Promotion promotion) {
        promotionMapper.update(promotion);
    }
}
