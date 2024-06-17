package com.backend.controller.store;


import com.backend.domain.store.Payment;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/store/payment")
public class PaymentController {

    @PostMapping("/add")
    public void addPayment(@RequestBody Payment payment) {

        System.out.println("payment = " + payment);
    }
}
