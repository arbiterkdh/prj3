package com.backend.service.promotion;

import com.backend.domain.promotion.Promotion;
import com.backend.domain.promotion.PromotionFile;
import com.backend.mapper.promotion.PromotionMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.ObjectCannedACL;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class PromotionService {
    private final PromotionMapper promotionMapper;
    final S3Client s3Client;

    @Value("${aws.s3.bucket.name}")
    String bucketName;

    @Value("${image.src.prefix}")
    String srcPrefix;

    public void addPromo(Promotion promotion, MultipartFile[] files) throws IOException {
        promotionMapper.insertPromo(promotion);
        if (files != null) {
            for (MultipartFile file : files) {
                promotionMapper.insertFileName(promotion.getId(), file.getOriginalFilename());

                String key = STR."prj3/promo/\{promotion.getId()}/\{file.getOriginalFilename()}";
                PutObjectRequest objectRequest = PutObjectRequest.builder()
                        .bucket(bucketName)
                        .key(key)
                        .acl(ObjectCannedACL.PUBLIC_READ)
                        .build();
                s3Client.putObject(objectRequest,
                        RequestBody.fromInputStream(file.getInputStream(), file.getSize()));
            }
        }
    }

    public boolean validate(Promotion promotion) {
        return promotion.getTitle() != null && !promotion.getTitle().isBlank() &&
                promotion.getEventType() != null &&
                promotion.getEventStartDate() != null &&
                promotion.getEventEndDate() != null;
    }

    public Map<String, Object> listPromotions(Integer page, String type, String search) {
        Map<String, Object> pageInfo = new HashMap<>();
        Integer countAll;
        List<Promotion> promotions;

        if (type.equals("ended")) {
            countAll = promotionMapper.countAllEnded(search);
            promotions = promotionMapper.selectAllPagingEnded(calculateOffset(page), 9, search);
        } else if (type.equals("all")) {
            countAll = promotionMapper.countAll(search);
            promotions = promotionMapper.selectAllPaging(calculateOffset(page), 9, search);
        } else {
            countAll = promotionMapper.countAllExcludingEnded(type, search);
            promotions = promotionMapper.selectAllPagingExcludingEnded(calculateOffset(page), 9, type, search);
        }

        setPageInfo(pageInfo, page, countAll);
        setPromotionFiles(promotions);

        return Map.of("pageInfo", pageInfo, "promotionList", promotions);
    }

    private void setPageInfo(Map<String, Object> pageInfo, Integer page, Integer countAll) {
        Integer lastPageNumber = (countAll - 1) / 9 + 1;
        Integer leftPageNumber = (page - 1) / 10 * 10 + 1;
        Integer rightPageNumber = Math.min(leftPageNumber + 9, lastPageNumber);

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
    }

    private Integer calculateOffset(Integer page) {
        return (page - 1) * 9;
    }

    private void setPromotionFiles(List<Promotion> promotions) {
        LocalDate now = LocalDate.now();
        for (Promotion promotion : promotions) {
            List<String> fileNames = promotionMapper.selectFileNameByPromoId(promotion.getId());
            List<PromotionFile> files = fileNames.stream()
                    .map(name -> new PromotionFile(name, STR."\{srcPrefix}/promo/\{promotion.getId()}/\{name}"))
                    .toList();
            promotion.setFileList(files);

            if (promotion.getEventEndDate().isBefore(now)) {
                promotion.setEventStatus("종료 이벤트");
            } else if (promotion.getEventStartDate().isAfter(now)) {
                promotion.setEventStatus("예정 이벤트");
            } else {
                promotion.setEventStatus("진행중인 이벤트");
            }
        }
    }

    public Map<String, Object> listAllWithoutPaging(String search) {
        List<Promotion> promotions = promotionMapper.selectAllWithoutPaging(search);
        setPromotionFiles(promotions);
        return Map.of("promotionList", promotions, "totalItems", promotions.size());
    }

    public Promotion get(Integer id) {
        Promotion promotion = promotionMapper.selectById(id);
        if (promotion == null) {
            return null;
        }
        setPromotionFiles(List.of(promotion));
        return promotion;
    }

    public void remove(Integer id) {
        List<String> fileNames = promotionMapper.selectFileNameByPromoId(id);

        for (String fileName : fileNames) {
            String key = STR."prj3/promo/\{id}/\{fileName}";
            DeleteObjectRequest objectRequest = DeleteObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .build();
            s3Client.deleteObject(objectRequest);
        }
        promotionMapper.deleteFileByPromoId(id);
        promotionMapper.deleteById(id);
    }

    public void modify(Promotion promotion, List<String> removeFileList, MultipartFile[] addFileList) throws IOException {
        if (removeFileList != null && !removeFileList.isEmpty()) {
            for (String fileName : removeFileList) {
                String key = STR."prj3/promo/\{promotion.getId()}/\{fileName}";
                DeleteObjectRequest objectRequest = DeleteObjectRequest.builder()
                        .bucket(bucketName)
                        .key(key)
                        .build();
                s3Client.deleteObject(objectRequest);

                promotionMapper.deleteFileByPromoIdAndName(promotion.getId(), fileName);
            }
        }
        if (addFileList != null && addFileList.length > 0) {
            List<String> fileNameList = promotionMapper.selectFileNameByPromoId(promotion.getId());
            for (MultipartFile file : addFileList) {
                String fileName = file.getOriginalFilename();
                if (!fileNameList.contains(fileName)) {
                    promotionMapper.insertFileName(promotion.getId(), fileName);
                }
                String key = STR."prj3/promo/\{promotion.getId()}/\{fileName}";
                PutObjectRequest objectRequest = PutObjectRequest.builder()
                        .bucket(bucketName)
                        .key(key)
                        .acl(ObjectCannedACL.PUBLIC_READ)
                        .build();

                s3Client.putObject(objectRequest, RequestBody.fromInputStream(file.getInputStream(), file.getSize()));
            }
        }
        promotionMapper.update(promotion);
    }

    public void updateRecommendation(Integer id, boolean isRecommended) {
        promotionMapper.updateRecommendation(id, isRecommended);
    }

    public List<Promotion> getRecommendedPromotions() {
        List<Promotion> promotions = promotionMapper.selectRecommendedPromotions();
        setPromotionFiles(promotions);
        return promotions;
    }

    public void addRecommendation(Integer id) {
        Promotion promotion = promotionMapper.selectById(id);
        if (promotion.getIsRecommended()) {
            throw new IllegalStateException("이미 추천 이벤트에 추가되었습니다.");
        }
        promotionMapper.updateRecommendation(id, true);
    }

    // 추천 이벤트에서 삭제하는 메서드 추가
    public void removeRecommendation(Integer id) {
        promotionMapper.updateRecommendation(id, false);
    }
}
