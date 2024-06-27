package com.backend.service.store;

import com.backend.domain.store.Payment;
import com.backend.domain.store.PaymentCancel;
import com.backend.mapper.store.*;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.net.ssl.HttpsURLConnection;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.URL;
import java.util.List;

@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
@Service
public class PaymentService {

    private final PaymentMapper mapper;
    private final CartMapper cartMapper;
    private final ProductOrderMapper orderMapper;
    private final ProductMapper productMapper;

    private final QrService qrService;
    private final PaymentMapper paymentMapper;
    private final PaymentCancelMapper paymentCancelMapper;

    @Value("${payment.key}")
    private String apiKey;

    @Value("${payment.secret.key}")
    private String secretApiKey;

    public int add(Payment payment) throws Exception {

        Object qrCode = qrService.create(payment);

        payment.setQrCode(qrCode);

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

            orderMapper.addSinggleProductOrder(payment.getProductId(), payment.getQuantity(), payment.getId(), payment.getName(), payment.getAmount(), payment.getAmount(), payment.getMemberNumber());

            productMapper.updateStock(payment.getProductId(), payment.getQuantity());
        }
        return payment.getId();
    }

    public List<Payment> getData(Integer memberNumber, Integer paymentId) {

        return mapper.getData(memberNumber, paymentId);
    }

    public String getToken() throws Exception {

        HttpsURLConnection conn = null;
        URL url = new URL("https://api.iamport.kr/users/getToken");

        conn = (HttpsURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-type", "application/json");
        conn.setRequestProperty("Accept", "application/json");
        conn.setDoOutput(true);

        JSONObject json = new JSONObject();
        json.put("imp_key", apiKey); // replace with your imp_key
        json.put("imp_secret", secretApiKey); // replace with your imp_secret

        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
        bw.write(json.toString());
        bw.flush();
        bw.close();

        BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "utf-8"));
        String line;
        String result = "";
        while ((line = br.readLine()) != null) {
            result += line;
        }
        br.close();

        JSONParser parser = new JSONParser();
        JSONObject response = (JSONObject) parser.parse(result);
        JSONObject responseData = (JSONObject) response.get("response");
        String token = (String) responseData.get("access_token");

        return token;
    }

    public void cancelPayment(PaymentCancel paymentCancel) throws Exception {
        String token = getToken();

        URL url = new URL("https://api.iamport.kr/payments/cancel");
        HttpsURLConnection conn = (HttpsURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-type", "application/json");
        conn.setRequestProperty("Accept", "application/json");
        conn.setRequestProperty("Authorization", "Bearer " + token);
        conn.setDoOutput(true);

        JSONObject json = new JSONObject();
        json.put("merchant_uid", paymentCancel.getOrderNumber());
        json.put("amount", paymentCancel.getAmount());
        json.put("reason", paymentCancel.getCancelReason());
        json.put("requestor", paymentCancel.getRequestor());

        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
        bw.write(json.toString());
        bw.flush();
        bw.close();

        BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "utf-8"));
        StringBuilder response = new StringBuilder();
        String line;
        while ((line = br.readLine()) != null) {
            response.append(line);
        }
        br.close();

        JSONParser parser = new JSONParser();
        JSONObject jsonResponse = (JSONObject) parser.parse(response.toString());

        System.out.println("응답 내용: " + jsonResponse.toString());

        Long code = (Long) jsonResponse.get("code");
        if (code != null && code == 0) {
            System.out.println("결제 취소 성공");

            Payment payment = paymentMapper.paymentData(paymentCancel.getOrderNumber());
            if (payment != null) {
                payment.setStatus("cancelled");
                paymentMapper.updatePaymentStatus(payment);

                JSONObject responseObj = (JSONObject) jsonResponse.get("response");
                paymentCancel.setCancelledAt((Long) responseObj.get("cancelled_at"));
                paymentCancel.setCardName((String) responseObj.get("card_name"));
                paymentCancel.setName((String) responseObj.get("name"));
                paymentCancel.setImpUid((String) responseObj.get("imp_uid"));
                paymentCancel.setCardNumber((String) responseObj.get("card_number"));
                paymentCancel.setReceiptUrl((String) responseObj.get("receipt_url"));

                paymentCancelMapper.insert(paymentCancel);

                productMapper.updateRefundStock(payment.getProductId(), payment.getQuantity());

//                productOrderMapper.deleteOrder(payment.getId());
            }
        } else {
            String errorMessage = (String) jsonResponse.get("message");
            System.err.println("결제 취소 실패: " + errorMessage);
        }
    }
}
