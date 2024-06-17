package com.backend.service.movie;

import com.backend.domain.movie.Movie;
import com.backend.mapper.movie.MovieCommentMapper;
import com.backend.mapper.movie.MovieMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.ObjectCannedACL;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class MovieService {

    private final S3Client s3Client;

    @Value("${aws.s3.bucket.name}")
    String bucketName;

    @Value("${image.src.prefix}")
    String srcPrefix;

    private final MovieMapper movieMapper;
    private final MovieCommentMapper commentMapper;

    public void addMovie(Movie movie, String[] movieType, MultipartFile[] file) throws IOException {
        movieMapper.insertMovie(movie);
        for (int i = 0; i < movieType.length; i++) {
            movieMapper.insertMovieType(movie.getId(), movieType[i]);
        }

        if (file != null) {
            for (MultipartFile file1 : file) {
                // db 에 해당 게시물의 파일 목록 저장
                movieMapper.insertFileName(movie.getId(), file1.getOriginalFilename());
                // 실제 파일 저장
                String key = STR."prj3/movie/\{movie.getId()}/\{file1.getOriginalFilename()}";
                PutObjectRequest objectRequest = PutObjectRequest.builder()
                        .bucket(bucketName)
                        .key(key)
                        .acl(ObjectCannedACL.PUBLIC_READ)
                        .build();

                s3Client.putObject(objectRequest,
                        RequestBody.fromInputStream(file1.getInputStream(), file1.getSize()));
            }
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

        if (movieType.length == 0) {
            return false;
        }

        // file 있는지 없는지 검증 필요...
        if (file == null || file.length == 0) {
            return false;
        }
        for (MultipartFile file1 : file) {
            if (file1 == null || file1.isEmpty()) {
                return false;
            }
        }

        return true;
    }

    public Map<String, Object> list(Integer page, Integer tab, String keyword) {
        Map<String, Object> pageInfo = new HashMap<>();
        LocalDate today = LocalDate.now();

        Integer numberOfMovie;

        // 현재 상영작 = 1, 상영예정작 = 2 ... db 조회
        if (tab == 1) {
            numberOfMovie = movieMapper.countNowShowingMovie(today, keyword);
        } else {
            numberOfMovie = movieMapper.countComingSoonMovie(today, keyword);
        }

        Integer lastPageNumber = (numberOfMovie - 1) / 20 + 1;
        Integer endset = page * 20;

        if (page == lastPageNumber) {
            endset = numberOfMovie;
        }

        pageInfo.put("numberOfMovie", numberOfMovie);
        pageInfo.put("lastPageNumber", lastPageNumber);

        List<Movie> list;
        if (tab == 1) {
            list = movieMapper.selectNowShowingMovieList(endset, today, keyword);
        } else {
            list = movieMapper.selectComingSoonMovietList(endset, today, keyword);
        }

        for (Movie movie : list) {
            String fileName = movieMapper.selectFileNameByMovieId(movie.getId());

            movie.setMovieImageFile(STR."\{srcPrefix}/movie/\{movie.getId()}/\{fileName}");
        }

        return Map.of("pageInfo", pageInfo,
                "movieList", list);
    }

    public Movie get(Integer movieId) {
        Movie movie = movieMapper.selectByMovieId(movieId);
        movie.setType(movieMapper.selectMovieTypeById(movieId));

        String fileName = movieMapper.selectFileNameByMovieId(movieId);
        String file = STR."\{srcPrefix}/movie/\{movieId}/\{fileName}";

        movie.setMovieImageFile(file);

        return movie;
    }


    public void deleteMovie(Integer movieId) {
        // 이미지 파일명 조회
        String fileName = movieMapper.selectFileNameByMovieId(movieId);

        // s3에 있는 이미지 파일 삭제
        String key = STR."prj3/movie/\{movieId}/\{fileName}";
        DeleteObjectRequest objectRequest = DeleteObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();

        s3Client.deleteObject(objectRequest);


        // 영화 타입 삭제
        movieMapper.deleteMovieTypeByMovieId(movieId);
        // 영화 이미지 삭제
        movieMapper.deleteMovieImageFileByMovieId(movieId);
        // 영화 댓글 삭제
        commentMapper.deleteCommentByMovieId(movieId);
        // 영화 삭제
        movieMapper.deleteMovieByMovieId(movieId);
    }

    public void editMovie(Movie movie, MultipartFile file) throws IOException {

        if (file != null && file.getSize() > 0) {
            // 파일 업데이트 이전 삭제 먼저 실행...
            String fileName = movieMapper.selectFileNameByMovieId(movie.getId());
            String key = STR."prj3/movie/\{movie.getId()}/\{fileName}";

            DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .build();
            s3Client.deleteObject(deleteObjectRequest);
            // db에서 파일 레코드 삭제
            movieMapper.deleteMovieImageFileByMovieId(movie.getId());


            // 파일 추가
            fileName = file.getOriginalFilename();
            movieMapper.insertFileName(movie.getId(), fileName);

            key = STR."prj3/movie/\{movie.getId()}/\{fileName}";
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .acl(ObjectCannedACL.PUBLIC_READ)
                    .build();

            s3Client.putObject(putObjectRequest, RequestBody.fromInputStream(file.getInputStream(), file.getSize()));

        }

        movieMapper.updateMovie(movie);

        // movie_type 수정 로직, movie_type 삭제 이후 새로 생성...
        movieMapper.deleteMovieTypeByMovieId(movie.getId());

        for (int i = 0; i < movie.getType().size(); i++) {
            movieMapper.insertMovieType(movie.getId(), movie.getType().get(i));
        }
    }

    public void like(Map<String, Object> req, Authentication authentication) {
        Map<String, Object> result = new HashMap<>();

    }
}
