package com.backend.service.store;


import com.backend.domain.store.Product;
import com.backend.domain.store.ProductCart;
import com.backend.mapper.store.CartMapper;
import com.backend.mapper.store.ProductMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartMapper mapper;
    private final ProductMapper productMapper;

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
                String path = STR."/Users/igyeyeong/Desktop/Store/ProductImage/\{product.getId()}/\{product.getFileName()}";
                cart.setPath(path);
                cart.setFileName(product.getFileName());
                cart.setQuantity(product.getQuantity());

                mapper.addCart(cart);
            }
        }
    }

    public List<ProductCart> cartProductList() {

        return mapper.cartProductList();
    }

    public void deleteItem(Integer productId) {

        mapper.deleteItem(productId);
    }
}
