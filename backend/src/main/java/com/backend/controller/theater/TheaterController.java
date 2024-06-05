package com.backend.controller.theater;

import com.backend.domain.theater.Theater;
import com.backend.service.theater.TheaterService;
import lombok.RequiredArgsConstructor;
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
    public void addTheater(@RequestBody Theater theater) {
        if (service.validate(theater)) {
            service.add(theater);
        }
    }

    @GetMapping("list")
    public List<Theater> getCity(@RequestParam(defaultValue = "서울") String city) {
        return service.get(city);
    }
}
