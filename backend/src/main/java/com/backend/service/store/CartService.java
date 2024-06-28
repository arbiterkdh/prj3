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

    public void addCart(Product product, Integer memberNumber) {


//        ProductCart existCart = mapper.getExistItem(memberNumber); //맴버번호로


        List<ProductCart> memberCartList = mapper.cartProductList(memberNumber); // 회원의 장바구니 상품 조회

        for (int i = 0; i < memberCartList.size(); i++) {

            if (memberCartList.get(i).getProductId() == product.getId()) {
                System.out.println("장바구니에 상품이 존재합니다");
                mapper.updateQuantity(memberCartList.get(i).getId());

            } else {
                System.out.println("없는 상품입니다");
            }
        }


        /*
        if (existCart != null) {

            mapper.updateQuantity(existCart.getId());
        } else {
            ProductCart cart = new ProductCart();

            cart.setId(product.getId());
            cart.setName(product.getName());
            cart.setPrice(product.getPrice());
            cart.setFileName(product.getFileName());
            cart.setQuantity(product.getQuantity());
            cart.setMemberNumber(memberNumber);
            cart.setTotalPrice(product.getPrice());

            mapper.addCart(cart);
        }
         */
    }

    public List<ProductCart> cartProductList(Integer memberNumber) {


        List<ProductCart> productCartList = mapper.cartProductList(memberNumber);

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

    public void modifyQuantity(ProductCart productCart) {

        mapper.modifyQuantity(productCart);
    }

    public int totalCount(Integer memberNumber) {

        return mapper.totalCount(memberNumber);
    }

}
