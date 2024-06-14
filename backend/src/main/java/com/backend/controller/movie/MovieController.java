package com.backend.controller.movie;

import com.backend.domain.movie.Movie;
import com.backend.service.movie.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity addMovie(Movie movie,
                                   String[] movieType,
                                   @RequestParam(value = "file[]") MultipartFile[] file) throws IOException {
//        System.out.println("movie = " + movie);
//        System.out.println("file = " + file);
//        System.out.println("movieType = " + movieType[1]);

        if (movieService.validate(movie, movieType, file)) {
            movieService.addMovie(movie, movieType, file);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("list")
    public Map<String, Object> list(@RequestParam(defaultValue = "1") Integer page, @RequestParam(defaultValue = "1") Integer tab, @RequestParam(required = false) String keyword) {
        return movieService.list(page, tab, keyword);
    }

    @GetMapping("{id}")
    public Map<String, Object> get(@PathVariable Integer id) {
        Map<String, Object> movieMap = movieService.get(id);

        return movieMap;
    }

    @DeleteMapping("delete/{id}")
    public void delete(@PathVariable Integer id) {
        movieService.deleteMovie(id);
    }

    @PutMapping("edit")
    public void edit(@RequestBody Movie movie) {
        movieService.editMovie(movie);
    }


}
