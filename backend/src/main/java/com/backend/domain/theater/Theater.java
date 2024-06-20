package com.backend.domain.theater;

import com.backend.domain.theater.box.TheaterBox;
import lombok.Data;

import java.util.List;

@Data
public class Theater {

    private Integer number;
    private String city;
    private String location;

    // 테이블 조인용
    private List<TheaterBox> theaterBoxList;
}
