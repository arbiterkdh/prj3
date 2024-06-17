package com.backend.service.store;

import com.backend.domain.store.Payment;
import com.backend.mapper.store.CartMapper;
import com.backend.mapper.store.PaymentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
@Service
public class PaymentService {

    private final PaymentMapper mapper;
    private final CartMapper cartMapper;

    public void add(Payment payment) {

        mapper.add(payment);


        for (int i = 0; i < payment.getCheckCartId().size(); i++) {

            System.out.println("payment id = " + payment.getId());
            System.out.println("checkcartid = " + payment.getCheckCartId().get(i));

            cartMapper.updatePaymentId(payment.getId(), payment.getCheckCartId().get(i));
        }


//        System.out.println("paymentInfo = " + paymentInfo);
//        if (paymentInfo.getStatus().equals("paid")) {
//            System.out.println("같다");
//            List<Integer> cartNoList = cartMapper.selectCartNo(payment.getMemberNumber());
//        }


    }
}
