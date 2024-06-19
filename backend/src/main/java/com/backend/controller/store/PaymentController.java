package com.backend.controller.store;


import com.backend.domain.store.Payment;
import com.backend.service.store.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/store/payment")
public class PaymentController {

    private final PaymentService service;

    @PostMapping("/add")
    public void addPayment(@RequestBody Payment payment) {


        service.add(payment);

    }
}
