package com.backend.service.store;

import com.backend.domain.store.Payment;
import com.backend.mapper.store.CartMapper;
import com.backend.mapper.store.PaymentMapper;
import com.backend.mapper.store.ProductMapper;
import com.backend.mapper.store.ProductOrderMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
@Service
public class PaymentService {

    private final PaymentMapper mapper;
    private final CartMapper cartMapper;
    private final ProductOrderMapper orderMapper;
    private final ProductMapper productMapper;

    public void add(Payment payment) {

        mapper.add(payment);

        for (int i = 0; i < payment.getCheckCartId().size(); i++) {

            orderMapper.copyCartData(payment.getCheckCartId().get(i), payment.getId());
        }

        for (int i = 0; i < payment.getCheckCartId().size(); i++) {

            Integer getQuantity = cartMapper.getQuantity(payment.getCheckCartId().get(i));
            Integer productId = cartMapper.getProductId(payment.getCheckCartId().get(i));
            productMapper.updateStock(productId, getQuantity);
        }

        for (int i = 0; i < payment.getCheckCartId().size(); i++) {

            cartMapper.deleteCartByCheckCartId(payment.getCheckCartId().get(i));
        }
    }

    public void getData(Integer memberNumber) {

        int limitData;

//        List<ProductOrder> orderData = mapper.getData(memberNumber, limitData);
    }
}
