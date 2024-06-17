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
    String srcPrefix;

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
        List<Promotion> promotions = promotionMapper.selectList();
        for (Promotion promotion : promotions) {
            List<String> fileNames = promotionMapper.selectFileNameByPromoId(promotion.getId());
            List<PromotionFile> files = fileNames.stream()
                    .map(name -> new PromotionFile(name, srcPrefix + promotion.getId() + "/" + name))
                    .toList();
            promotion.setFileList(files);
        }
        return promotions;
    }

    public Promotion get(Integer id) {
        Promotion promotion = promotionMapper.selectById(id);
        List<String> fileNames = promotionMapper.selectFileNameByPromoId(id);

        List<PromotionFile> files = fileNames.stream()
                .map(name -> new PromotionFile(name, STR."\{srcPrefix}\{id}/\{name}"))
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

    public void modify(Promotion promotion, List<String> removeFileList, MultipartFile[] addFileList) throws IOException {
        if (removeFileList != null && removeFileList.size() > 0) {
            for (String fileName : removeFileList) {
                String key = STR."prj3/\{promotion.getId()}/\{fileName}";
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
                String key = STR."prj3/\{promotion.getId()}/\{fileName}";
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
}
