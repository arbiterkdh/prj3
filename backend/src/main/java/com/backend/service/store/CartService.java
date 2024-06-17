package com.backend.service.store;


import com.backend.domain.store.Product;
import com.backend.domain.store.ProductCart;
import com.backend.domain.store.ProductImage;
import com.backend.mapper.store.CartMapper;
import com.backend.mapper.store.ProductMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import software.amazon.awssdk.services.s3.S3Client;

import java.util.List;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class CartService {

    private final CartMapper mapper;
    private final ProductMapper productMapper;

    private final S3Client s3Client;

    @Value("${aws.s3.bucket.name}")
    String bucketName;

    @Value("${image.src.prefix}")
    String srcPrefix;

    public void addCart(Product product) {


        ProductCart existCart = mapper.getExistItem(product.getId());

        if (existCart != null) {

            System.out.println("수량:" + existCart.getQuantity());

            mapper.updateQuantity(existCart.getQuantity(), existCart.getProductId());
        } else {
            Product productInfo = productMapper.info(product.getId());

            if (productInfo != null) {

                ProductCart cart = new ProductCart();

                cart.setId(product.getId());
                cart.setName(product.getName());
                cart.setPrice(product.getPrice());
                cart.setFileName(product.getFileName());
                cart.setQuantity(product.getQuantity());

                mapper.addCart(cart);
            }
        }
    }

    public List<ProductCart> cartProductList() {


        List<ProductCart> productCartList = mapper.cartProductList();

        for (ProductCart cartItem : productCartList) {

            String fileName = mapper.selectFileName(cartItem.getProductId());

            ProductImage imageFile = new ProductImage(fileName, STR."\{srcPrefix}/store/\{cartItem.getProductId()}/\{fileName}");
            cartItem.setImage(imageFile);
        }

        return productCartList;
    }

    public void deleteItem(Integer productId) {

        mapper.deleteItem(productId);
    }
}
