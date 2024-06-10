package com.backend.controller.movie;

import com.backend.domain.movie.MovieComment;
import com.backend.service.movie.MovieCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
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
    @PreAuthorize("isAuthenticated()")
    public void addComment(@RequestBody MovieComment comment, Authentication authentication) {
        System.out.println("comment = " + comment);
        System.out.println("authentication.getName() = " + authentication.getName());


    }
}
