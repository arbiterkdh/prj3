package com.backend.service.theater.box;

import com.backend.domain.theater.box.TheaterBox;
import com.backend.mapper.theater.box.TheaterBoxMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class TheaterBoxService {

    private final TheaterBoxMapper theaterBoxMapper;

    public List<TheaterBox> getTheaterBoxList(Integer theaterNumber) {
        return theaterBoxMapper.selectAllTheaterBoxByTheaterNumber(theaterNumber);
    }
}
