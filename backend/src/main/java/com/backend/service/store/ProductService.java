package com.backend.service.store;

import com.backend.domain.store.Product;
import com.backend.domain.store.ProductType;
import com.backend.mapper.store.ImageMapper;
import com.backend.mapper.store.ProductMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class ProductService {

    private final ProductMapper mapper;
    private final ImageMapper imageMapper;

    public void add(Product product, MultipartFile[] files) throws Exception {

        mapper.add(product);

        if (files != null) {
            for (MultipartFile file : files) {

                String dir = STR."/Users/igyeyeong/Desktop/Store/ProductImage/\{product.getId()}";
                File dirFile = new File(dir);
                if (!dirFile.exists()) {
                    dirFile.mkdirs();
                }

                String path = STR."/Users/igyeyeong/Desktop/Store/ProductImage/\{product.getId()}/\{file.getOriginalFilename()}";
                File destination = new File(path);
                file.transferTo(destination);
                imageMapper.add(product.getId(), file.getOriginalFilename(), path);
            }
        }
    }


    public List<Product> productList(String menuTypeSelect) {

        return mapper.productList(menuTypeSelect);
    }

    public void deleteProduct(Integer id) {

        String fileName = imageMapper.selectFileName(id);

        String dir = STR."/Users/igyeyeong/Desktop/Store/ProductImage/\{id}/";

        if (fileName != null) {

            File file = new File(dir + fileName);
            file.delete();

            File dirFile = new File(dir);
            if (dirFile.exists()) {
                dirFile.delete();
            }
        }

        imageMapper.deleteImage(id);

        mapper.deleteProduct(id);

    }

    public void updateProduct(Integer productId, Product product, String originalFileName, MultipartFile[] file) throws Exception {

        if (file == null) {
            mapper.updateProduct(product, productId);
        }
        if (file != null) {

            for (MultipartFile newFile : file) {

                String originalPath = STR."/Users/igyeyeong/Desktop/Store/ProductImage/\{productId}/\{originalFileName}";
                File originalFile = new File(originalPath);

                if (originalFile.exists()) {
                    originalFile.delete();
                }
                String path = STR."/Users/igyeyeong/Desktop/Store/ProductImage/\{productId}/\{newFile.getOriginalFilename()}";
                File modifyFile = new File(path);

                newFile.transferTo(modifyFile);

                mapper.updateProduct(product, productId);
                imageMapper.update(newFile.getOriginalFilename(), path, productId);
            }
        }
    }

    public Product info(Integer id) {

        return mapper.info(id);
    }

    public List<ProductType> typeList() {

        return mapper.typeList();
    }
}
