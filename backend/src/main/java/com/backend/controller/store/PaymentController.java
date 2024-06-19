package com.backend.controller.store;


import com.backend.domain.store.Payment;
import com.backend.domain.store.ProductOrder;
import com.backend.service.store.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/store/payment")
public class PaymentController {

    private final PaymentService service;

    @PostMapping("/add")
    public void addPayment(@RequestBody Payment payment) {

        service.add(payment);
    }

    @GetMapping("/orderDataList/{memberNumber}")
    public List<ProductOrder> orderDataList(@PathVariable Integer memberNumber) {

        System.out.println("memberNumber = " + memberNumber);

        service.getData(memberNumber);

        return null;
    }

}
