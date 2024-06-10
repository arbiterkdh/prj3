package com.backend.service.movie;


import com.backend.domain.movie.MovieComment;
import com.backend.mapper.movie.MovieCommentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class MovieCommentService {

    private final MovieCommentMapper commentMapper;

    public boolean validate(MovieComment comment) {
        if (comment == null) {
            return false;
        }
        if (comment.getMovieId() == null) {
            return false;
        }
        if (comment.getComment() == null || comment.getComment().isBlank()) {
            return false;
        }

        return true;
    }

    public void addComment(MovieComment comment, Authentication authentication) {
        comment.setMemberId(Integer.valueOf(authentication.getName()));

        commentMapper.insertMovieComment(comment);
    }

    public List<MovieComment> list(Integer movieId) {
        return commentMapper.selectCommentByMovieId(movieId);
    }

    public void deleteComment(Integer commentId) {
        commentMapper.deleteCommentByCommentId(commentId);
    }

    public boolean hasAccess(MovieComment comment, Authentication authentication) {
        MovieComment db = commentMapper.selectCommentByCommentId(comment.getId());
        if (db == null) {
            return false;
        }
        if (!authentication.getName().equals(db.getMemberId().toString())) {
            return false;
        }
        return true;
    }
}
