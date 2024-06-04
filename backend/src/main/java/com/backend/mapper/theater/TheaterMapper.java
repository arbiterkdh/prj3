package com.backend.mapper.theater;

import com.backend.domain.theater.Theater;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface TheaterMapper {

    @Select("""
            SELECT *
            FROM theater
            WHERE city = #{city}
            """)
    List<Theater> selectAllByCity(String city);
}
