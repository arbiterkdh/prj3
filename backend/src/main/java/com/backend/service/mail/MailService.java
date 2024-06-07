package com.backend.service.mail;

import com.backend.domain.mail.Mail;
import com.backend.mapper.mail.MailMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class MailService {
    private final JavaMailSender mailSender;
    private final MailMapper mapper;

    @Value("${spring.mail.username}")
    String fromAddress;

    public Mail mailSend(Mail mail) throws MailException {
        Integer verifyNumber = (int) (Math.random() * 1000000);
        Mail dbMail = null;
        do {
            dbMail = mapper.selectMailByVerifyNumber(verifyNumber);
        } while (dbMail != null || verifyNumber < 100000);
        {
            verifyNumber = (int) (Math.random() * 1000000);
            dbMail = mapper.selectMailByVerifyNumber(verifyNumber);
        }

        mail.setVerifyNumber(verifyNumber);
        mapper.insertVerifyNumberTemporary(mail);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(mail.getAddress());
        message.setFrom(fromAddress);
        message.setSubject("생존코딩에서 인증번호를 보내드립니다.");
        message.setText(STR."인증번호는 [  \{verifyNumber}  ] 입니다.");

        mailSender.send(message);

        return mapper.selectMailByVerifyNumber(verifyNumber);
    }

    public void delete(Integer verifyNumber) {
        mapper.deleteMailByVerifyNumber(verifyNumber);
    }

    public Mail getMail(Integer verifyNumber) {
        return mapper.selectMailByVerifyNumber(verifyNumber);
    }
}
