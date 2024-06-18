package com.backend.service.store;

import com.backend.domain.store.Payment;
import com.backend.domain.store.ProductCart;
import com.backend.mapper.store.CartMapper;
import com.backend.mapper.store.PaymentMapper;
import com.backend.mapper.store.ProductOrderMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
@Service
public class PaymentService {

    private final PaymentMapper mapper;
    private final CartMapper cartMapper;
    private final ProductOrderMapper orderMapper;

    public void add(Payment payment) {

        mapper.add(payment); //결제 데이터저장


        //장바구니 체크된 데이터 가져오기
        List<ProductCart> cartDataList = new ArrayList<>();

        System.out.println("넘겨받은 카트 번호 사이즈 : " + payment.getCheckCartId().size());

        for (int i = 0; i < payment.getCheckCartId().size(); i++) {
            System.out.println("payment.getCheckCartId().get(i) =" + payment.getCheckCartId().get(i));
            cartDataList = cartMapper.cartDataByCheckCartId(payment.getCheckCartId().get(i));
        }

        System.out.println("cartDataList =>");
        cartDataList.forEach(System.out::println);
        System.out.println("===============");

        //주문으로 데이터 복사
        for (int i = 0; i < payment.getCheckCartId().size(); i++) {
            orderMapper.copyCartData(payment.getCheckCartId().get(i), payment.getId());
        }

        //장바구니 데이터 삭제
        for (int i = 0; i < payment.getCheckCartId().size(); i++) {
            cartMapper.deleteCartByCheckCartId(payment.getCheckCartId().get(i));
        }


//        System.out.println("paymentInfo = " + paymentInfo);
//        if (paymentInfo.getStatus().equals("paid")) {
//            System.out.println("같다");
//            List<Integer> cartNoList = cartMapper.selectCartNo(payment.getMemberNumber());
//        }


    }
}
