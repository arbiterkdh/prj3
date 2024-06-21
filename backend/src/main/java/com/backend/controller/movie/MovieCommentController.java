package com.backend.controller.movie;

import com.backend.domain.movie.MovieComment;
import com.backend.service.movie.MovieCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/movie/comment")
@RequiredArgsConstructor
public class MovieCommentController {

    private final MovieCommentService commentService;

    @PostMapping("add")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity addComment(@RequestBody MovieComment comment, Authentication authentication) {

        if (commentService.validate(comment)) {
            commentService.addComment(comment, authentication);
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.badRequest().build();
    }

    @GetMapping("{movieId}")
    public Map<String, Object> list(@PathVariable Integer movieId, @RequestParam Integer page) {
        return commentService.list(movieId, page);
    }

    @DeleteMapping("delete")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity delete(@RequestBody MovieComment comment, Authentication authentication) {
        if (commentService.hasAccess(comment, authentication)) {
            commentService.deleteComment(comment.getId());
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    @PutMapping("edit")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity edit(@RequestBody MovieComment comment, Authentication authentication) {
        if (commentService.hasAccess(comment, authentication)) {
            commentService.editComment(comment);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
}
