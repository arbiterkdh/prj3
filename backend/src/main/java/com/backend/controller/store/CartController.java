package com.backend.controller.store;


import com.backend.domain.store.Product;
import com.backend.domain.store.ProductCart;
import com.backend.service.store.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/store/cart")
public class CartController {

    private final CartService service;

    @PostMapping("/add")
    public void addCart(Product product) {

        service.addCart(product);
    }

    @GetMapping("/list")
    public List<ProductCart> cartList() {

        return service.cartProductList();
    }
}
