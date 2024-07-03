package com.backend.controller.book.payment;

import com.backend.domain.store.Payment;
import com.backend.domain.store.PaymentCancel;
import com.backend.service.store.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/book/payment")
public class BookPaymentController {

    private final PaymentService paymentService;

    @PostMapping("add")
    public int addBookPayment(@RequestBody Payment payment) throws Exception {
        return paymentService.add(payment);
    }

    @GetMapping("orderDataList/{memberNumber}/{paymentId}")
    public Map<String, Object> orderDataList(@PathVariable Integer memberNumber, @PathVariable Integer paymentId) {

        return paymentService.getBookData(memberNumber, paymentId);
    }

    @GetMapping("orderDataList/{memberNumber}")
    public List<Map<String, Object>> orderDataList(@PathVariable Integer memberNumber) {

        return paymentService.getAllBookData(memberNumber);
    }

    @GetMapping("getToken")
    public String getToken() throws Exception {

        System.out.println("token정보 = " + paymentService.getToken());

        return paymentService.getToken();
    }


    @PostMapping("cancel")
    public void paymentCancel(@RequestBody PaymentCancel paymentCancel) throws Exception {

        Boolean isBookPaymentCancel = true;
        paymentService.cancelPayment(paymentCancel, isBookPaymentCancel);
    }
}
