package com.backend.controller.mail;

import com.backend.domain.mail.Mail;
import com.backend.service.mail.MailService;
import com.backend.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/mail")
@RequiredArgsConstructor
public class MailController {

    private final MailService service;
    private final MemberService memberService;

    @PostMapping("check")
    public ResponseEntity checkMail(@RequestBody Mail mail) {
        boolean isNormalForm = mail.getAddress().matches("^[a-zA-Z0-9\\-_]+@[a-zA-Z0-9-]+\\.[a-zA-Z]+$");
        if (!isNormalForm) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        if (!memberService.hasEmail(mail.getAddress())) {
            return ResponseEntity.ok().build();
        }
        // CONFLICT 는 409 번, 이미 사용중인 이메일.
        return ResponseEntity.status(HttpStatus.CONFLICT).build();
    }

    @PostMapping("")
    public Mail sendMailAndGetVerifyNumber(@RequestBody Mail mail) {
        return service.mailSend(mail);
    }

    @DeleteMapping("delete/{verifyNumber}")
    public ResponseEntity deleteMail(@PathVariable Integer verifyNumber) {
        if (service.getMail(verifyNumber) != null) {
            service.delete(verifyNumber);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
}
