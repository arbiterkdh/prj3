package com.backend.controller.movie;

import com.backend.domain.movie.MovieComment;
import com.backend.service.movie.MovieCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/movie/comment")
@RequiredArgsConstructor
public class MovieCommentController {

    private final MovieCommentService commentService;

    @PostMapping("add")
    public void addComment(@RequestBody MovieComment comment) {
//        System.out.println("comment = " + comment);
//        System.out.println("authentication.getName() = " + authentication.getName());


    }
}
