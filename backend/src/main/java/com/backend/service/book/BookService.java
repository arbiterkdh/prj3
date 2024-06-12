package com.backend.service.book;

import com.backend.domain.movie.Movie;
import com.backend.mapper.book.BookMapper;
import com.backend.mapper.movie.MovieMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class BookService {
    private final BookMapper bookMapper;
    private final MovieMapper movieMapper;

    public List<Movie> getMovieList() {
        return movieMapper.selectAllMovie();
    }

    public List<Movie> getMovieListByLocation(String location) {
        return bookMapper.selectMovieIdByTheaterLocation(location);
    }


}
