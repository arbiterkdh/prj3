package com.backend.controller.book;

import com.backend.domain.movie.Movie;
import com.backend.service.book.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/book")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    @GetMapping("movie/list")
    public List<Movie> getMovies() {
        return bookService.getMovieList();
    }


    @GetMapping("movie-list?location={location}")
    public List<Movie> getMovieList(@PathVariable(required = false) String location) {
        return bookService.getMovieListByLocation(location);
    }

}
