package com.backend.mapper.book.seat;

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
}
