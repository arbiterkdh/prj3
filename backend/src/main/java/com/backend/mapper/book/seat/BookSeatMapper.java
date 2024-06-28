package com.backend.mapper.book.seat;

import com.backend.domain.book.seat.BookSeat;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface BookSeatMapper {


    @Select("""
            SELECT row_col
            FROM book_seat
            WHERE book_seat_book_place_time_id = #{bookPlaceTimeId}
            """)
    List<String> selectAllRowColByBookPlaceTimeId(Integer bookPlaceTimeId);

    @Select("""
            SELECT *
            FROM book_seat
            WHERE book_seat_book_place_time_id = #{bookPlaceTimeId}
            AND row_col = #{rowCol}
            """)
    BookSeat selectBookSeat(BookSeat bookSeat);

    @Insert("""
            INSERT INTO book_seat
            (book_seat_book_place_time_id, row_col, book_seat_member_number)
            VALUES(#{bookPlaceTimeId}, #{rowCol}, #{bookSeatMemberNumber})
            """)
    int insertBookSeat(BookSeat bookSeat);

    @Select("""
            SELECT COUNT(*)
            FROM book_seat
            WHERE book_seat_book_place_time_id = #{bookPlaceTimeId}
            AND row_col = #{rowCol}
            AND book_seat_member_number = #{bookSeatMemberNumber}
            """)
    int checkBookSeatHasSameMemberNumber(BookSeat bookSeat);

    @Delete("""
            DELETE FROM book_seat
            WHERE book_seat_book_place_time_id = #{bookPlaceTimeId}
            AND row_col = #{rowCol}
            """)
    int deleteBookSeat(BookSeat bookSeat);

    @Delete("""
            DELETE FROM book_seat
            WHERE book_seat_member_number = #{bookSeatMemberNumber}
            AND is_paid = FALSE
            """)
    int deleteAllBookSeatByBookSeatMemberNumber(Integer bookSeatMemberNumber);
}
