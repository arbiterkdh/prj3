package com.backend.service.theater;

import com.backend.domain.theater.Theater;
import com.backend.mapper.theater.TheaterMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class TheaterService {

    private final TheaterMapper theaterMapper;

    public List<Theater> get(String city) {

        return theaterMapper.selectAllByCity(city);
    }

    public boolean validate(Theater theater) {

        if (theaterMapper.selectTheaterByCityAndLocation(theater.getCity(), theater.getLocation()) == null) {
            return true;
        }
        return false;
    }

    public void add(Theater theater) {
        theaterMapper.insert(theater);
    }

    public List<String> getCityList() {
        return theaterMapper.selectAllCity();
    }

    public void delete(Integer number) {
        theaterMapper.deleteTheaterByNumber(number);
    }

    public Theater getTheaterByNumber(Integer theaterNumber) {
        return theaterMapper.selectTheaterByTheaterNumber(theaterNumber);
    }

    public List<Map<String, Object>> getAllCitiesIncludesLocation() {
        List<String> cityList = theaterMapper.selectAllCity();
        List<Map<String, Object>> cityListIncludesLocation = new ArrayList<>();

        for (String city : cityList) {
            Map<String, Object> cityMap = new HashMap<>();
            List<Theater> theaterList = theaterMapper.selectAllByCity(city);
            cityMap.put("city", city);
            cityMap.put("theaterList", theaterList);
            cityListIncludesLocation.add(cityMap);
        }

        return cityListIncludesLocation;
    }
}
