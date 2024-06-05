package com.backend.controller.store;

import com.backend.domain.store.Product;
import com.backend.service.store.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

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

    @GetMapping("/list")
    public List<Product> list() {

        return service.productList();
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Integer id) {

        service.deleteProduct(id);
    }
}
