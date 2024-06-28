package com.backend.mapper.book.seat;

import com.backend.domain.book.seat.BookSeat;
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
    BookSeat selectBookSeat(Integer bookPlaceTimeId, String rowCol);

    @Insert("""
            INSERT INTO book_seat
            (book_seat_book_place_time_id, row_col)
            VALUES(#{bookPlaceTimeId}, #{rowCol})
            """)
    int insertBookSeat(Integer bookPlaceTimeId, String rowCol);
}
