package com.backend.mapper.book.seat;

import com.backend.domain.book.BookPlaceTime;
import com.backend.domain.book.seat.BookSeat;
import org.apache.ibatis.annotations.*;

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

    @Update("""
            UPDATE book_place_time
            SET vacancy = vacancy + #{i}
            WHERE book_place_time_id = #{bookPlaceTimeId}
            """)
    int updateBookPlaceTimeVacancy(Integer bookPlaceTimeId, int i);

    @Delete("""
            DELETE FROM book_seat
            WHERE is_paid = FALSE
            AND DATE_ADD(selected_time, INTERVAL 10 MINUTE ) < NOW()
            """)
    int deleteBookSeatByCompareSelectedTimeWithCurrentTime();

    @Select("""
            SELECT bpt.book_place_time_id, bpt.theater_box_movie_id, bpt.vacancy, bpt.start_time, bpt.end_time
            FROM book_seat bs JOIN book_place_time bpt ON bs.book_seat_book_place_time_id = bpt.book_place_time_id
            WHERE is_paid = FALSE
            AND DATE_ADD(selected_time, INTERVAL 10 MINUTE ) < NOW()
            """)
    List<BookPlaceTime> selectBookSeatByTimeoutExpiredWithoutPayment();
}
