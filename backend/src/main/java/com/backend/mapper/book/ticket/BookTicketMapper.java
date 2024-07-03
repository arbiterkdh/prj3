package com.backend.mapper.book.ticket;

import com.backend.domain.book.ticket.BookTicket;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface BookTicketMapper {

    @Insert("""
            INSERT INTO book_ticket
            (book_ticket_payment_id, book_ticket_movie_id, book_ticket_book_place_time_id, book_ticket_member_number, book_ticket_row_cols, book_ticket_price)
            VALUES (#{bookTicketPaymentId}, #{bookTicketMovieId}, #{bookTicketBookPlaceTimeId}, #{bookTicketMemberNumber}, #{bookTicketRowCols}, #{bookTicketPrice})
            """)
    int addBookTicket(BookTicket bookTicket);

    @Select("""
            SELECT *
            FROM book_ticket
            WHERE book_ticket_payment_id = #{paymentId}
            AND book_ticket_member_number = #{memberNumber}
            """)
    BookTicket getBookTicket(Integer memberNumber, Integer paymentId);

    @Select("""
            SELECT *
            FROM book_ticket
            WHERE book_ticket_member_number = #{memberNumber}
            """)
    List<BookTicket> getAllBookTicket(Integer memberNumber);

    @Update("""
            UPDATE book_ticket
            SET is_valid = FALSE
            WHERE book_ticket_payment_id = #{paymentId}
            """)
    int updateBookTicketIsValidFalse(Integer paymentId);

    @Select("""
            SELECT *
            FROM book_ticket
            WHERE book_ticket_payment_id = #{paymentId}
            """)
    BookTicket selectBookTicketByPaymentId(Integer paymentId);

    @Update("""
            UPDATE book_ticket
            SET is_valid = FALSE
            WHERE book_ticket_book_place_time_id =
               (SELECT bpt.book_place_time_id
                FROM  book_place_time bpt
                WHERE DATE_SUB(bpt.start_time, INTERVAL 1 HOUR ) < NOW())
            """)
    int updateBookTicketIsValidFalseByCurrentDate();
}
