package com.backend.controller.book.payment;

import com.backend.domain.store.Payment;
import com.backend.domain.store.PaymentCancel;
import com.backend.service.store.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/book/payment")
public class BookPaymentController {

    private final PaymentService paymentService;

    @PostMapping("add")
    public int addBookPayment(@RequestBody Payment payment) throws Exception {

        int paymentId = paymentService.add(payment);

        System.out.println("paymentId = " + paymentId);

        return paymentId;
    }

    @GetMapping("/orderDataList/{memberNumber}/{paymentId}")
    public List<Payment> orderDataList(@PathVariable Integer memberNumber, @PathVariable Integer paymentId) {

        return paymentService.getData(memberNumber, paymentId);
    }

    @GetMapping("/getToken")
    public String getToken() throws Exception {

        System.out.println("token정보 = " + paymentService.getToken());

        return paymentService.getToken();
    }


    @PostMapping("/cancel")
    public void paymentCancel(@RequestBody PaymentCancel paymentCancel) throws Exception {

        paymentService.cancelPayment(paymentCancel);
    }
}
