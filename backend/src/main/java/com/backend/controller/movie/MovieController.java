package com.backend.controller.movie;

import com.backend.domain.movie.Movie;
import com.backend.service.movie.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.s3.S3Client;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/movie")
@RequiredArgsConstructor
public class MovieController {

    private final MovieService movieService;

    final S3Client s3Client;

    @Value("${aws.s3.bucket.name}")
    String bucketName;

    @Value("${image.src.prefix}")
    String srcPrefix;

    @PostMapping("add")
    @PreAuthorize("hasAuthority('SCOPE_admin')")
    public ResponseEntity addMovie(Movie movie,
                                   String[] movieType,
                                   @RequestParam(value = "file[]") MultipartFile[] file) throws IOException {
        if (movieService.validate(movie, movieType, file)) {
            movieService.addMovie(movie, movieType, file);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("list")
    public Map<String, Object> list(@RequestParam(defaultValue = "1") Integer page, @RequestParam(defaultValue = "1") Integer tab,
                                    @RequestParam(required = false) String keyword, Authentication authentication) {
        return movieService.list(page, tab, keyword, authentication);
    }

    @GetMapping("{id}")
    public Map<String, Object> get(@PathVariable Integer id, Authentication authentication) {
        return movieService.get(id, authentication);
    }

    @DeleteMapping("delete/{id}")
    @PreAuthorize("hasAuthority('SCOPE_admin')")
    public void delete(@PathVariable Integer id) {
        movieService.deleteMovie(id);
    }

    @PutMapping("edit")
    @PreAuthorize("hasAuthority('SCOPE_admin')")
    public void edit(Movie movie, @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
        movieService.editMovie(movie, file);
    }

    @PutMapping("like")
    @PreAuthorize("isAuthenticated()")
    public Map<String, Object> like(@RequestBody Map<String, String> req, Authentication authentication) {
        return movieService.like(req, authentication);
    }

}
