package com.backend.controller.store;


import com.backend.domain.store.ProductQnA;
import com.backend.service.store.ProductQnAService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/store/product/qna")
public class ProductQnAController {

    private final ProductQnAService service;

    @PostMapping("/add")
    public void addQnA(@RequestBody ProductQnA productQnA) {

        System.out.println("productQnA = " + productQnA);

        service.addQnA(productQnA);
    }

    @GetMapping("/list/{productId}")
    public List<ProductQnA> listQnA(@PathVariable Integer productId) {

        return service.listQnA(productId);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteQnA(@PathVariable Integer id) {

        service.deleteQnA(id);
    }

    @PutMapping("/modify")
    public void modifyQnA(@RequestBody ProductQnA productQnA) {

        System.out.println("productQnA = " + productQnA);

        service.modifyQnA(productQnA);
    }

}