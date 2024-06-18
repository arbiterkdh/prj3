package com.backend.controller.theater.box;

import com.backend.domain.theater.box.TheaterBox;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/theaterbox")
@RequiredArgsConstructor
public class TheaterBoxController {

    @PostMapping("add")
    public TheaterBox addTheaterBox(@RequestBody TheaterBox theaterBox) {

        return null;
    }
}
