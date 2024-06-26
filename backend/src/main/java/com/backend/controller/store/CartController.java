package com.backend.controller.store;


import com.backend.domain.store.Product;
import com.backend.domain.store.ProductCart;
import com.backend.service.store.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/store/cart")
public class CartController {

    private final CartService service;

    @PostMapping("/add")
    public void addCart(Product product, @RequestParam("memberNumber") Integer memberNumber) {


        service.addCart(product, memberNumber);
    }

    @GetMapping("/list")
    public List<ProductCart> cartList() {

        return service.cartProductList();
    }


    @DeleteMapping("/delete/{productId}")
    public void deleteItem(@PathVariable Integer productId) {

        service.deleteItem(productId);
    }

    @PutMapping("/modifyQuantity")
    public void modifyQuantity(@RequestBody ProductCart productCart) {


        service.modifyQuantity(productCart);
    }

    @GetMapping("/totalCount")
    public int totalCount(@RequestParam("memberNumber") Integer memberNumber) {

        return service.totalCount(memberNumber);
    }


}
