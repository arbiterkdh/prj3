package com.backend.service.store;

import com.backend.domain.store.Payment;
import com.backend.mapper.store.CartMapper;
import com.backend.mapper.store.PaymentMapper;
import com.backend.mapper.store.ProductMapper;
import com.backend.mapper.store.ProductOrderMapper;
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
    private final ProductOrderMapper orderMapper;
    private final ProductMapper productMapper;

    public int add(Payment payment) {

        mapper.add(payment);

        if (payment.getCheckCartId() != null && !payment.getCheckCartId().isEmpty()) {

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
        } else {

            System.out.println("payment.getBuyerDate() = " + payment.getBuyerDate());

            orderMapper.addSinggleProductOrder(payment.getProductId(), payment.getQuantity(), payment.getId(), payment.getName(), payment.getAmount(), payment.getAmount(), payment.getMemberNumber());

            productMapper.updateStock(payment.getProductId(), payment.getQuantity());
        }


        return payment.getId();
    }

    public List<Payment> getData(Integer memberNumber, Integer paymentId) {

        return mapper.getData(memberNumber, paymentId);
    }
}
