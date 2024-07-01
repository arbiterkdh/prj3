package com.backend.service.promotion;

import com.backend.domain.promotion.Promo;
import com.backend.domain.promotion.PromoFile;
import com.backend.mapper.promotion.PromoMapper;
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
public class PromoService {
    private final PromoMapper promoMapper;
    final S3Client s3Client;

    @Value("${aws.s3.bucket.name}")
    String bucketName;

    @Value("${image.src.prefix}")
    String srcPrefix;

    public void addPromo(Promo promo, MultipartFile[] detailFile, MultipartFile[] recommendedFile, MultipartFile[] thumbnailFile) throws IOException {
        if (promo.getIsRecommended() == null) {
            promo.setIsRecommended(false);
        }
        promoMapper.insertPromo(promo);

        uploadFiles(promo.getId(), "detail", detailFile);
        uploadFiles(promo.getId(), "recommended", recommendedFile);
        uploadFiles(promo.getId(), "thumbnail", thumbnailFile);
    }

    private void uploadFiles(int promoId, String fileType, MultipartFile[] files) throws IOException {
        if (files != null) {
            for (MultipartFile file : files) {
                promoMapper.insertFileName(promoId, fileType, file.getOriginalFilename());
                String key = STR."prj3/promo/\{promoId}/\{file.getOriginalFilename()}";
                PutObjectRequest objectRequest = PutObjectRequest.builder()
                        .bucket(bucketName)
                        .key(key)
                        .acl(ObjectCannedACL.PUBLIC_READ)
                        .build();
                s3Client.putObject(objectRequest, RequestBody.fromInputStream(file.getInputStream(), file.getSize()));
            }
        }
    }

    public boolean validate(Promo promo) {
        return promo.getTitle() != null && !promo.getTitle().isBlank() &&
                promo.getEventType() != null &&
                promo.getEventStartDate() != null &&
                promo.getEventEndDate() != null;
    }

    public Map<String, Object> listPromo(Integer page, Integer pageSize, String type, String search) {
        if (pageSize == null) {
            pageSize = 4;
        }

        Map<String, Object> pageInfo = new HashMap<>();
        Integer countAll;
        List<Promo> promos;

        if (type.equals("ended")) {
            countAll = promoMapper.countAllEnded(search);
            promos = promoMapper.selectAllPagingEnded(calculateOffset(page, pageSize), pageSize, search);
        } else if (type.equals("all")) {
            countAll = promoMapper.countAll(search);
            promos = promoMapper.selectAllPaging(calculateOffset(page, pageSize), pageSize, search);
        } else {
            countAll = promoMapper.countAllExcludingEnded(type, search);
            promos = promoMapper.selectAllPagingExcludingEnded(calculateOffset(page, pageSize), pageSize, type, search);
        }

        setPageInfo(pageInfo, page, countAll, pageSize);
        setPromotionFiles(promos);

        return Map.of("pageInfo", pageInfo, "promotionList", promos);
    }

    private void setPageInfo(Map<String, Object> pageInfo, Integer page, Integer countAll, Integer itemsPerPage) {
        Integer lastPageNumber = (countAll - 1) / itemsPerPage + 1;

        pageInfo.put("currentPageNumber", page);
        pageInfo.put("lastPageNumber", lastPageNumber);
        pageInfo.put("totalItems", countAll);
    }

    private Integer calculateOffset(Integer page, Integer itemsPerPage) {
        return (page - 1) * itemsPerPage;
    }

    private void setPromotionFiles(List<Promo> promos) {
        LocalDate now = LocalDate.now();
        for (Promo promo : promos) {
            List<PromoFile> files = promoMapper.selectFileNamesByPromoId(promo.getId());
            for (PromoFile file : files) {
                file.setFilePath(String.format("%s/promo/%d/%s", srcPrefix, promo.getId(), file.getFileName()));
            }
            promo.setFileList(files);

            if (promo.getEventEndDate().isBefore(now)) {
                promo.setEventStatus("종료 이벤트");
            } else if (promo.getEventStartDate().isAfter(now)) {
                promo.setEventStatus("예정 이벤트");
            } else {
                promo.setEventStatus("진행중인 이벤트");
            }
        }
    }

    public Map<String, Object> listAllWithoutPaging(String search) {
        List<Promo> promos = promoMapper.selectAllWithoutPaging(search);
        setPromotionFiles(promos);
        return Map.of("promotionList", promos, "totalItems", promos.size());
    }

    public Promo get(Integer id) {
        Promo promo = promoMapper.selectById(id);
        if (promo == null) {
            return null;
        }
        setPromotionFiles(List.of(promo));
        return promo;
    }

    public void promoRemove(Integer id) {
        List<PromoFile> promoFiles = promoMapper.selectFileNamesByPromoId(id);
        for (PromoFile promoFile : promoFiles) {
            String fileName = promoFile.getFileName();
            String key = STR."prj3/promo/\{id}/\{fileName}";
            DeleteObjectRequest objectRequest = DeleteObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .build();
            s3Client.deleteObject(objectRequest);
        }
        promoMapper.deleteFileByPromoId(id);
        promoMapper.deleteById(id);
    }

    public void modify(Promo promo, List<String> removeFileList, MultipartFile[] addDetailFiles, MultipartFile[] addRecommendedFiles, MultipartFile[] addThumbnailFiles) throws IOException {
        if (removeFileList != null && !removeFileList.isEmpty()) {
            for (String fileName : removeFileList) {
                String key = STR."prj3/promo/\{promo.getId()}/\{fileName}";
                DeleteObjectRequest objectRequest = DeleteObjectRequest.builder()
                        .bucket(bucketName)
                        .key(key)
                        .build();
                s3Client.deleteObject(objectRequest);

                promoMapper.deleteFileByPromoIdAndName(promo.getId(), fileName);
            }
        }
        uploadFiles(promo.getId(), "detail", addDetailFiles);
        uploadFiles(promo.getId(), "recommended", addRecommendedFiles);
        uploadFiles(promo.getId(), "thumbnail", addThumbnailFiles);
        promoMapper.update(promo);
    }

    public void updateRecommendation(Integer id, boolean isRecommended) {
        promoMapper.updateRecommendation(id, isRecommended);
    }

    public List<Promo> getRecommendedPromotions() {
        List<Promo> promos = promoMapper.selectRecommendedPromotions();
        setPromotionFiles(promos);
        return promos;
    }

    public void addRecommendation(Integer id) {
        Promo promo = promoMapper.selectById(id);
        if (promo.getIsRecommended()) {
            throw new IllegalStateException("이미 추천 이벤트에 추가되었습니다.");
        }
        promoMapper.updateRecommendation(id, true);
    }

    public void removeRecommendation(Integer id) {
        promoMapper.updateRecommendation(id, false);
    }

}

