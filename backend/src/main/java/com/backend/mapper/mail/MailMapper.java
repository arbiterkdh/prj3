package com.backend.mapper.mail;

import com.backend.domain.mail.Mail;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MailMapper {


    @Insert("""
            INSERT INTO mail
            (verify_number)
            VALUES (#{verifyNumber})
            """)
    int insertVerifyNumberTemporary(Mail mail);
}
