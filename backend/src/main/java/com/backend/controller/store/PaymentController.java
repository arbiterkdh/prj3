package com.backend.controller.store;


import com.backend.domain.store.Payment;
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
    public int addPayment(@RequestBody Payment payment) throws Exception {

        int paymentId = service.add(payment);

        System.out.println("paymentId = " + paymentId);

        return paymentId;
    }

    @GetMapping("/orderDataList/{memberNumber}/{paymentId}")
    public List<Payment> orderDataList(@PathVariable Integer memberNumber, @PathVariable Integer paymentId) {


        return service.getData(memberNumber, paymentId);
    }
}
