package com.backend.controller.store;

import com.backend.domain.store.Product;
import com.backend.service.store.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/store/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService service;

    @PostMapping("/add")
    public void add(Product product, @RequestParam(value = "files[]", required = true) MultipartFile[] files) throws Exception {

        System.out.println("product = " + product);

        for (int i = 0; i < files.length; i++) {
            System.out.println(files[i].getOriginalFilename());
        }

        service.add(product, files);


    }

}
