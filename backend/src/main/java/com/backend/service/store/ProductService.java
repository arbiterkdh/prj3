package com.backend.service.store;

import com.backend.domain.store.Product;
import com.backend.domain.store.ProductImage;
import com.backend.domain.store.ProductType;
import com.backend.mapper.store.ImageMapper;
import com.backend.mapper.store.ProductMapper;
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

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class ProductService {

    private final ProductMapper mapper;
    private final ImageMapper imageMapper;
    private final S3Client s3Client;

    @Value("${aws.s3.bucket.name}")
    String bucketName;

    @Value("${image.src.prefix}")
    String srcPrefix;


    public void add(Product product, MultipartFile[] files) throws Exception {

        mapper.add(product);

        if (files != null) {
            for (MultipartFile file : files) {
                imageMapper.add(product.getId(), file.getOriginalFilename());

                String key = STR."prj3/store/\{product.getId()}/\{file.getOriginalFilename()}";
                PutObjectRequest objectRequest = PutObjectRequest.builder()
                        .bucket(bucketName)
                        .key(key)
                        .acl(ObjectCannedACL.PUBLIC_READ)
                        .build();

                s3Client.putObject(objectRequest, RequestBody.fromInputStream(file.getInputStream(), file.getSize()));
            }
        }
    }


    public Map<String, Object> productList(String menuTypeSelect, Integer page) {


        Integer offset = (page - 1) * 12;

        Integer totalCount = mapper.totalCount(menuTypeSelect);

        Integer lastPageNumber = (totalCount - 1) / 10 + 1;
        Integer leftPageNumber = (page - 1) / 10 * 10 + 1;
        Integer rightPageNumber = leftPageNumber + 9;

        Map pageInfo = new HashMap();

        rightPageNumber = Math.min(rightPageNumber, lastPageNumber);

        Integer prevPageNumber = leftPageNumber - 1;
        Integer nextPageNumber = rightPageNumber + 1;

        if (prevPageNumber > 0) {
            pageInfo.put("prevPageNumber", prevPageNumber);
        }
        if (nextPageNumber <= lastPageNumber) {
            pageInfo.put("nextPageNumber", nextPageNumber);
        }
        pageInfo.put("currentPage", page);
        pageInfo.put("leftPageNumber", leftPageNumber);
        pageInfo.put("rightPageNumber", rightPageNumber);

        List<Product> productList = mapper.productList(menuTypeSelect, offset);

        for (Product product : productList) {
            String fileName = imageMapper.selectFileName(product.getId());

            ProductImage imageFile = new ProductImage(fileName, STR."\{srcPrefix}/store/\{product.getId()}/\{fileName}");

            product.setImage(imageFile);
        }


        return Map.of("productList", productList,
                "pageInfo", pageInfo);
    }

    public void deleteProduct(Integer id) {

        String fileName = imageMapper.selectFileName(id);

        String key = STR."prj3/store/\{id}/\{fileName}";
        DeleteObjectRequest objectRequest = DeleteObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();

        s3Client.deleteObject(objectRequest);

        imageMapper.deleteImage(id);

        mapper.deleteProduct(id);

    }

    public void updateProduct(Integer productId, Product product, String originalFileName, MultipartFile file) throws Exception {

        if (file == null) {
            mapper.updateProduct(product, productId);
        }
        if (file != null) {

            String key = STR."prj3/store/\{productId}/\{originalFileName}";
            DeleteObjectRequest objectRequest = DeleteObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .build();

            s3Client.deleteObject(objectRequest);

            String newKey = STR."prj3/store/\{productId}/\{file.getOriginalFilename()}";

            PutObjectRequest newObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(newKey)
                    .acl(ObjectCannedACL.PUBLIC_READ)
                    .build();

            s3Client.putObject(newObjectRequest, RequestBody.fromInputStream(file.getInputStream(), file.getSize()));

            imageMapper.update(file.getOriginalFilename(), productId);
            mapper.updateProduct(product, productId);
        }
    }

    public Product info(Integer id) {

        Product product = mapper.info(id);
        String fileName = imageMapper.selectFileName(id);

        ProductImage imageFile = new ProductImage(fileName, STR."\{srcPrefix}/store/\{id}/\{fileName}");

        product.setImage(imageFile);

        return product;
    }

    public List<ProductType> typeList() {

        return mapper.typeList();
    }
}
