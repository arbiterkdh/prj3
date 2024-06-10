package com.backend.service.movie;

import com.backend.domain.movie.Movie;
import com.backend.mapper.movie.MovieMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class MovieService {

    private final MovieMapper movieMapper;

    public void addMovie(Movie movie, String[] movieType, MultipartFile[] file) {
        movieMapper.insertMovie(movie);
        for (int i = 0; i < movieType.length; i++) {
            movieMapper.insertMovieType(movie.getId(), movieType[i]);
        }


    }

    public boolean validate(Movie movie, String[] movieType, MultipartFile[] file) {
        if (movie.getTitle() == null || movie.getTitle().isBlank()) {
            return false;
        }
        if (movie.getContent() == null || movie.getContent().isBlank()) {
            return false;
        }
        if (movie.getGenre() == null || movie.getGenre().isBlank()) {
            return false;
        }
        if (movie.getRunningTime() == null || movie.getRunningTime() == 0) {
            return false;
        }
        if (movie.getRating() == null || movie.getRating() == 0) {
            return false;
        }
        if (movie.getStartDate() == null) {
            return false;
        }
        if (movie.getDirector() == null || movie.getDirector().isBlank()) {
            return false;
        }
        if (movie.getActors() == null || movie.getActors().isBlank()) {
            return false;
        }

        if (movieType.length)

            return true;
    }

    public List<Movie> list() {
        return movieMapper.selectList();
    }

    public Movie get(Integer movieId) {
        Movie movie = movieMapper.selectByMovieId(movieId);
        movie.setType(movieMapper.selectMovieTypeById(movieId));
        return movie;
    }


    public void deleteMovie(Integer movieId) {
        movieMapper.deleteMovieTypeByMovieId(movieId);
        movieMapper.deleteMovieByMovieId(movieId);
    }

    public void editMovie(Movie movie) {
        movieMapper.updateMovie(movie);

        // movie_type 수정 로직, movie_type 삭제 이후 새로 생성...
        movieMapper.deleteMovieTypeByMovieId(movie.getId());

        for (int i = 0; i < movie.getType().size(); i++) {
            movieMapper.insertMovieType(movie.getId(), movie.getType().get(i));
        }
    }
}
