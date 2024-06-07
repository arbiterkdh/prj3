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

        Product productInfo = productMapper.info(product.getId());

        ProductCart cart = new ProductCart();

        cart.setId(productInfo.getId());
        cart.setName(productInfo.getName());
        cart.setPrice(productInfo.getPrice());
        String path = STR."/Users/igyeyeong/Desktop/Store/ProductImage/\{productInfo.getId()}/\{product.getFileName()}";
        cart.setPath(path);
        cart.setFileName(product.getFileName());
        cart.setQuantity(productInfo.getQuantity());

        mapper.addCart(cart);
    }

    public List<ProductCart> cartProductList() {

        return mapper.cartProductList();
    }
}
