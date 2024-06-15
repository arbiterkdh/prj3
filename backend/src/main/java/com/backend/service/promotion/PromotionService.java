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
import java.util.List;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class PromotionService {
    private final PromotionMapper promotionMapper;
    final S3Client s3Client;

    @Value("${aws.s3.bucket.name}")
    String bucketName;

    @Value("${image.src.prefix}")
    String SrcPrefix;

    public void addPromo(Promotion promotion, MultipartFile[] files) throws IOException {
        promotionMapper.insertPromo(promotion);

        if (files != null) {
            for (MultipartFile file : files) {
                promotionMapper.insertFileName(promotion.getId(), file.getOriginalFilename());

                String key = STR."prj3/\{promotion.getId()}/\{file.getOriginalFilename()}";
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
                .map(name -> new PromotionFile(name, STR."\{SrcPrefix}\{id}/\{name}"))
                .toList();

        promotion.setFileList(files);

        return promotion;
    }

    public void remove(Integer id) {
        List<String> fileNames = promotionMapper.selectFileNameByPromoId(id);

        for (String fileName : fileNames) {
            String key = STR."prj3/\{id}/\{fileName}";
            DeleteObjectRequest objectRequest = DeleteObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .build();

            s3Client.deleteObject(objectRequest);
        }
        promotionMapper.deleteFileByPromoId(id);
        promotionMapper.deleteById(id);
    }

    public void modify(Promotion promotion) {
        promotionMapper.update(promotion);
    }
}
