package com.backend.service.store;

import com.backend.domain.store.Payment;
import com.backend.mapper.store.CartMapper;
import com.backend.mapper.store.PaymentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
@Service
public class PaymentService {

    private final PaymentMapper mapper;
    private final CartMapper cartMapper;

    public void add(Payment payment) {

        mapper.add(payment);

        Payment paymentInfo = mapper.paymentInfo(payment.getId());

        System.out.println("paymentInfo = " + paymentInfo);
        if (paymentInfo.getStatus().equals("paid")) {
            System.out.println("같다");
            List<Integer> cartNoList = cartMapper.selectCartNo(payment.getMemberNumber());


        }


    }
}
