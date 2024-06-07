package com.backend.controller.movie;

import com.backend.domain.movie.Movie;
import com.backend.service.movie.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/movie")
@RequiredArgsConstructor
public class MovieController {

    private final MovieService movieService;

    @PostMapping("add")
    public ResponseEntity addMovie(Movie movie,
                                   String[] movieType,
                                   @RequestParam(value = "file[]") MultipartFile[] file) {
//        System.out.println("movie = " + movie);
//        System.out.println("file = " + file);
//        System.out.println("movieType = " + movieType[1]);

        if (movieService.validate(movie, movieType, file)) {
            movieService.addMovie(movie, movieType, file);
            return ResponseEntity.ok().build();
        }
        return null;
    }

    @GetMapping("list")
    public List<Movie> list() {
        return movieService.list();
    }

    @GetMapping("{id}")
    public Movie get(@PathVariable Integer id) {
        Movie movie = movieService.get(id);

        return movie;
    }

    @DeleteMapping("delete/{id}")
    public void delete(@PathVariable Integer id) {
        movieService.deleteMovie(id);
    }


}
