package com.backend.mapper.book.ticket;

import com.backend.domain.book.ticket.BookTicket;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;

@Mapper
public interface BookTicketMapper {

    @Insert("""
            INSERT INTO book_ticket
            (book_ticket_movie_id, book_ticket_book_place_time_id, book_ticket_member_number, book_ticket_row_cols, book_ticket_price)
            VALUES (#{bookTicketMovieId}, #{bookTicketBookPlaceTimeId}, #{bookTicketMemberNumber}, #{bookTicketRowCols}, #{bookTicketPrice})
            """)
    @Options(useGeneratedKeys = true, keyProperty = "bookTicketId")
    int addBookTicket(BookTicket bookTicket);
}
