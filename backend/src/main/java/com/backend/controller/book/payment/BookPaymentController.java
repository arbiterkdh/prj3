package com.backend.controller.book.payment;

import com.backend.domain.book.payment.BookPayment;
import com.backend.service.book.payment.BookPaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/book/payment")
public class BookPaymentController {

    private final BookPaymentService bookPaymentService;

    @PostMapping("add")
    public Integer addBookPayment(@RequestBody BookPayment bookPayment) {

        Integer paymentId = bookPaymentService.add(bookPayment);

        System.out.println("paymentId = " + paymentId);

        return paymentId;
    }
}
