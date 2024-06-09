package com.backend.controller.theater;

import com.backend.domain.theater.Theater;
import com.backend.service.theater.TheaterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/theater")
@RequiredArgsConstructor
public class TheaterController {

    private final TheaterService service;

    @GetMapping("")
    public List<String> getCities() {
        return service.getCityList();
    }

    @PostMapping("add")
    public ResponseEntity addTheater(@RequestBody Theater theater) {
        if (service.validate(theater)) {
            service.add(theater);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @GetMapping("list")
    public List<Theater> getCity(@RequestParam(defaultValue = "서울") String city) {
        return service.get(city);
    }

    @DeleteMapping("delete/{number}")
    public void deleteTheater(@PathVariable Integer number) {
        service.delete(number);
    }
}
