package com.backend.controller.theater.box;

import com.backend.domain.theater.box.TheaterBox;
import com.backend.service.theater.box.TheaterBoxService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/theaterbox")
@RequiredArgsConstructor
public class TheaterBoxController {

    private final TheaterBoxService theaterBoxService;

    @PostMapping("add")
    public TheaterBox addTheaterBox(@RequestBody TheaterBox theaterBox) {

        return null;
    }

    @GetMapping("{theaterNumber}")
    public List<TheaterBox> getTheaterBoxList(@PathVariable Integer theaterNumber) {

        return theaterBoxService.getTheaterBoxList(theaterNumber);
    }
}
