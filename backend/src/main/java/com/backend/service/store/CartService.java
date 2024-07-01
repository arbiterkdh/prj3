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


        ProductCart existCart = mapper.getExistItem(memberNumber, product.getId());

        List<ProductCart> memberCartList = mapper.cartProductList(memberNumber); // 회원의 장바구니 상품 조회

        if (existCart != null) {
            mapper.updateQuantity(product.getId(), memberNumber);
        } else {
            ProductCart productCart = new ProductCart();

            productCart.setName(product.getName());
            productCart.setProductId(product.getId());
            productCart.setFileName(product.getFileName());
            productCart.setQuantity(product.getQuantity());
            productCart.setPrice(product.getPrice());
            productCart.setTotalPrice(product.getPrice());
            productCart.setMemberNumber(memberNumber);

            mapper.addCart(productCart);
        }

/*
        ProductCart productCart = null;

        for (int i = 0; i < memberCartList.size(); i++) {

            if (memberCartList.get(i).getProductId() == product.getId()) {
                System.out.println("장바구니에 상품이 존재합니다");
                mapper.updateQuantity(memberCartList.get(i).getId());

            } else {
                System.out.println("없는 상품입니다");

                productCart = new ProductCart();

                productCart.setName(product.getName());
                productCart.setProductId(product.getId());
                productCart.setPrice(product.getPrice());
                productCart.setFileName(product.getFileName());
                productCart.setQuantity(product.getQuantity());
                productCart.setMemberNumber(memberNumber);
                productCart.setTotalPrice(product.getPrice());

            }
        }
        mapper.addCart(productCart);

 */



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

            System.out.println("cartItem = " + cartItem);

            String fileName = mapper.selectFileName(cartItem.getProductId(), memberNumber);

            ProductImage imageFile = new ProductImage(fileName, STR."\{srcPrefix}/store/\{cartItem.getProductId()}/\{fileName}");
            cartItem.setImage(imageFile);
        }

        return productCartList;
    }

    public void deleteItem(Integer productId, Integer memberNumber) {

        mapper.deleteItem(productId, memberNumber);
    }

    public void modifyQuantity(ProductCart productCart) {

        mapper.modifyQuantity(productCart);
    }

    public int totalCount(Integer memberNumber) {

        return mapper.totalCount(memberNumber);
    }

}
