package com.backend.controller.theater;

import com.backend.domain.theater.Theater;
import com.backend.service.theater.TheaterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/theater")
@RequiredArgsConstructor
public class TheaterController {

    private final TheaterService theaterService;

    @GetMapping("")
    public List<String> getCities() {
        return theaterService.getCityList();
    }

    @GetMapping("city/location")
    public List<Map<String, Object>> getAllCitiesIncludesLocation() {
        return theaterService.getAllCitiesIncludesLocation();
    }

    @GetMapping("location/{theaterNumber}")
    public Theater getTheaterLocation(@PathVariable Integer theaterNumber) {
        return theaterService.getTheaterByNumber(theaterNumber);
    }

    @PostMapping("add")
    public ResponseEntity addTheater(@RequestBody Theater theater) {
        if (theaterService.validate(theater)) {
            theaterService.add(theater);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @GetMapping("list")
    public List<Theater> getCity(@RequestParam(defaultValue = "서울") String city) {
        return theaterService.get(city);
    }

    @DeleteMapping("delete/{number}")
    public void deleteTheater(@PathVariable Integer number) {
        theaterService.delete(number);
    }
}
