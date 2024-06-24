package com.backend.service.store;


import com.backend.domain.store.Payment;
import com.backend.mapper.store.QrMapper;
import com.backend.service.store.util.GsonConfig;
import com.google.gson.Gson;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.util.Base64;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class QrService {

    private final QrMapper mapper;


    public Object create(Payment payment) throws Exception {


        int width = 200;
        int height = 200;

        Gson gson = GsonConfig.createGson();

        String newPayment = gson.toJson(payment);

        System.out.println("newPayment = " + newPayment);

        BitMatrix bitMatrix = new MultiFormatWriter().encode(newPayment, BarcodeFormat.QR_CODE, width, height);

        BufferedImage qrImage = MatrixToImageWriter.toBufferedImage(bitMatrix);

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(qrImage, "png", baos);
        String qrImageCode = Base64.getEncoder().encodeToString(baos.toByteArray());

        return qrImageCode;
    }
}
