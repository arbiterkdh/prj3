package com.backend.service.theater;

import com.backend.domain.theater.Theater;
import com.backend.mapper.theater.TheaterMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class TheaterService {

    private final TheaterMapper mapper;

    public List<Theater> get(String city) {

        return mapper.selectAllByCity(city);
    }

    public boolean validate(Theater theater) {

        if (mapper.selectTheaterByCityAndLocation(theater.getCity(), theater.getLocation()) == null) {
            return true;
        }
        return false;
    }

    public void add(Theater theater) {
        mapper.insert(theater);
    }
}
