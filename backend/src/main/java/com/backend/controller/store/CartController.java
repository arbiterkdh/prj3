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

    @GetMapping("/list/{memberNumber}")
    public List<ProductCart> cartList(@PathVariable Integer memberNumber) {

        return service.cartProductList(memberNumber);
    }


    @DeleteMapping("/delete/{memberNumber}/{productId}")
    public void deleteItem(@PathVariable Integer productId, @PathVariable Integer memberNumber) {

        service.deleteItem(productId, memberNumber);
    }

    @PutMapping("/modifyQuantity")
    public void modifyQuantity(@RequestBody ProductCart productCart) {


        service.modifyQuantity(productCart);
    }

    @GetMapping("/totalCount/{memberNumber}")
    public int totalCount(@PathVariable Integer memberNumber) {

        System.out.println("memberNumber = " + memberNumber);

        System.out.println("총 개수:" + service.totalCount(memberNumber));

        return service.totalCount(memberNumber);
    }


}
