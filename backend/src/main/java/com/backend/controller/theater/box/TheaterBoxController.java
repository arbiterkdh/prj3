package com.backend.controller.theater.box;

import com.backend.domain.theater.box.TheaterBox;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/theater/box")
@RequiredArgsConstructor
public class TheaterBoxController {

    @PostMapping("{theaternumber}/{boxnumber}")
    public TheaterBox addTheaterBox(
            @PathVariable Integer theaternumber,
            @PathVariable Integer boxnumber,
            @RequestBody TheaterBox theaterBox) {

        return null;
    }
}
