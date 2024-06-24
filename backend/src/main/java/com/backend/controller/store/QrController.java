package com.backend.controller.store;


import com.backend.domain.store.ProductOrder;
import com.backend.service.store.QrService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/store/qr")
public class QrController {

    private final QrService qrService;


    @GetMapping("/read")
    public Object createQR() throws Exception {

        ProductOrder productOrder = new ProductOrder();
        productOrder.setName("테스트 상품");
        productOrder.setPrice(2000);
        productOrder.setId(100);
        productOrder.setProductId(10);
        productOrder.setPaymentId(3);
        productOrder.setRegDate(LocalDateTime.now());


        Object Qr = qrService.create(productOrder);

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_PNG)
                .body(Qr);
    }
}


