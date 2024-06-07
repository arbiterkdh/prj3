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

    private final MailService service;

    @PostMapping("")
    public Mail sendAndGetMail(@RequestBody Mail mail) {
        return service.mailSend(mail);
    }
}
