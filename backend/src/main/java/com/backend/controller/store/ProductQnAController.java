package com.backend.controller.store;


import com.backend.domain.store.ProductQnA;
import com.backend.service.store.ProductQnAService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


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
    public Map<String, Object> listQnA(@PathVariable Integer productId, @RequestParam(defaultValue = "1", value = "page") Integer page) {

        return service.listQnA(productId, page);
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