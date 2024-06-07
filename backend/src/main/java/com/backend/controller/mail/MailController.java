package com.backend.controller.mail;

import com.backend.domain.mail.Mail;
import com.backend.service.mail.MailService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/mail")
@RequiredArgsConstructor
public class MailController {

    private final MailService mailService;

    @PostMapping("")
    public void sendMail(@RequestBody Mail mail) {
        mailService.mailSend(mail);
    }
}
