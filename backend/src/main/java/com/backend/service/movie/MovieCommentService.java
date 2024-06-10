package com.backend.service.movie;


import com.backend.mapper.movie.MovieCommentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class MovieCommentService {

    private final MovieCommentMapper commentMapper;

}
