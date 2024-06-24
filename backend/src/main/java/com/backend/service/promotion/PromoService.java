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

    public void addPromo(Promo promo, MultipartFile[] files) throws IOException {
        promoMapper.insertPromo(promo);
        if (files != null) {
            for (MultipartFile file : files) {
                promoMapper.insertFileName(promo.getId(), file.getOriginalFilename());

                String key = STR."prj3/promo/\{promo.getId()}/\{file.getOriginalFilename()}";
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

    public boolean validate(Promo promo) {
        return promo.getTitle() != null && !promo.getTitle().isBlank() &&
                promo.getEventType() != null &&
                promo.getEventStartDate() != null &&
                promo.getEventEndDate() != null;
    }

    public Map<String, Object> listPromo(Integer page, String type, String search) {
        Map<String, Object> pageInfo = new HashMap<>();
        Integer countAll;
        List<Promo> promos;

        if (type.equals("ended")) {
            countAll = promoMapper.countAllEnded(search);
            promos = promoMapper.selectAllPagingEnded(calculateOffset(page), 9, search);
        } else if (type.equals("all")) {
            countAll = promoMapper.countAll(search);
            promos = promoMapper.selectAllPaging(calculateOffset(page), 9, search);
        } else {
            countAll = promoMapper.countAllExcludingEnded(type, search);
            promos = promoMapper.selectAllPagingExcludingEnded(calculateOffset(page), 9, type, search);
        }

        setPageInfo(pageInfo, page, countAll);
        setPromotionFiles(promos);

        return Map.of("pageInfo", pageInfo, "promotionList", promos);
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

    private void setPromotionFiles(List<Promo> promos) {
        LocalDate now = LocalDate.now();
        for (Promo promo : promos) {
            List<String> fileNames = promoMapper.selectFileNameByPromoId(promo.getId());
            List<PromoFile> files = fileNames.stream()
                    .map(name -> new PromoFile(name, STR."\{srcPrefix}/promo/\{promo.getId()}/\{name}"))
                    .toList();
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
        List<String> fileNames = promoMapper.selectFileNameByPromoId(id);

        for (String fileName : fileNames) {
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

    public void modify(Promo promo, List<String> removeFileList, MultipartFile[] addFileList) throws IOException {
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
        if (addFileList != null && addFileList.length > 0) {
            List<String> fileNameList = promoMapper.selectFileNameByPromoId(promo.getId());
            for (MultipartFile file : addFileList) {
                String fileName = file.getOriginalFilename();
                if (!fileNameList.contains(fileName)) {
                    promoMapper.insertFileName(promo.getId(), fileName);
                }
                String key = STR."prj3/promo/\{promo.getId()}/\{fileName}";
                PutObjectRequest objectRequest = PutObjectRequest.builder()
                        .bucket(bucketName)
                        .key(key)
                        .acl(ObjectCannedACL.PUBLIC_READ)
                        .build();

                s3Client.putObject(objectRequest, RequestBody.fromInputStream(file.getInputStream(), file.getSize()));
            }
        }
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

    // 추천 이벤트에서 삭제하는 메서드 추가
    public void removeRecommendation(Integer id) {
        promoMapper.updateRecommendation(id, false);
    }
}
