package com.backend.controller.store;

import com.backend.domain.store.Product;
import com.backend.domain.store.ProductType;
import com.backend.service.store.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/store/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService service;

    @PostMapping("/add")
    public void add(Product product, @RequestParam(value = "file", required = true) MultipartFile[] file) throws Exception {

        service.add(product, file);
    }

    @GetMapping("/list/{menuTypeSelect}")
    public Map<String, Object> list(@PathVariable(required = false) String menuTypeSelect, @RequestParam(value = "page", defaultValue = "1") Integer page) {

        System.out.println("page = " + page);

        return service.productList(menuTypeSelect, page);
    }

    @GetMapping("/type")
    public List<ProductType> typeList() {

        return service.typeList();
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Integer id) {

        service.deleteProduct(id);
    }

    @PutMapping("/modify")
    public void Modify(Product product, @RequestParam("productId") Integer productId, @RequestParam("fileName") String originalFileName, @RequestParam(value = "file", required = false) MultipartFile file) throws Exception {


        service.updateProduct(productId, product, originalFileName, file);
    }

    @GetMapping("/view/{productId}")
    public Product view(@PathVariable Integer productId) {

        System.out.println("productId = " + productId);

        return service.info(productId);

    }

}
