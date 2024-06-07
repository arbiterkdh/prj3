package com.backend.mapper.mail;

import com.backend.domain.mail.Mail;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface MailMapper {


    @Insert("""
            INSERT INTO mail
            (address, verify_number)
            VALUES (#{address}, #{verifyNumber})
            """)
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insertVerifyNumberTemporary(Mail mail);

    @Select("""
            SELECT *
            FROM mail
            WHERE verify_number = #{verifyNumber}
            """)
    Mail selectMailByVerifyNumber(Integer verifyNumber);
}
