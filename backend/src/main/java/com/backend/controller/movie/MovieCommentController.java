package com.backend.controller.movie;

import com.backend.domain.movie.MovieComment;
import com.backend.service.movie.MovieCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movie/comment")
@RequiredArgsConstructor
public class MovieCommentController {

    private final MovieCommentService commentService;

    @PostMapping("add")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity addComment(@RequestBody MovieComment comment, Authentication authentication) {
//        System.out.println("comment = " + comment);
//        System.out.println("authentication.getName() = " + authentication.getName());

        if (commentService.validate(comment)) {
            commentService.addComment(comment, authentication);
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.badRequest().build();
    }

    @GetMapping("{movieId}")
    public List<MovieComment> list(@PathVariable Integer movieId) {
//        System.out.println("movieId = " + movieId);
        return commentService.list(movieId);
    }

    @DeleteMapping("delete")
    public ResponseEntity delete(@RequestBody MovieComment comment, Authentication authentication) {
        if (commentService.hasAccess(comment, authentication)) {
            commentService.deleteComment(comment.getId());
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
}
