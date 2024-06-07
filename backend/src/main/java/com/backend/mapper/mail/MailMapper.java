package com.backend.mapper.mail;

import com.backend.domain.mail.Mail;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface MailMapper {


    @Insert("""
            INSERT INTO mail
            (verify_number)
            VALUES (#{verifyNumber})
            """)
    int insertVerifyNumberTemporary(Mail mail);

    @Select("""
            SELECT *
            FROM mail
            WHERE verify_number = #{verifyNumber}
            """)
    Mail selectMailByVerifyNumber(Integer verifyNumber);

    @Delete("""
            DELETE FROM mail
            WHERE verify_number = #{verifyNumber}
            """)
    int deleteMailByVerifyNumber(Integer verifyNumber);
}
