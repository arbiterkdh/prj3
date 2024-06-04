package com.backend.controller.theater;

import com.backend.domain.theater.Theater;
import com.backend.service.theater.TheaterService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/theater")
@RequiredArgsConstructor
public class TheaterController {

    private final TheaterService service;

    @GetMapping("{city}")
    public List<Theater> getCity(@PathVariable String city) {
        return service.get(city);
    }
}
