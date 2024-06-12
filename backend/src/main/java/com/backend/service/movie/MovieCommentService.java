package com.backend.service.movie;


import com.backend.domain.movie.MovieComment;
import com.backend.mapper.movie.MovieCommentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

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

    public Map<String, Object> list(Integer movieId, Integer page) {
        Map pageInfo = new HashMap();
        Integer CountAll = commentMapper.countCommentByMovieId(movieId);

        Integer offset = (page - 1) * 10;
        Integer lastPageNumber = (CountAll - 1) / 10 + 1;
        Integer leftPageNumber = (page - 1) / 10 * 10 + 1;
        Integer rightPageNumber = leftPageNumber + 9;
        rightPageNumber = Math.min(rightPageNumber, lastPageNumber);
        Integer prevPageNumber = leftPageNumber - 10;
        Integer nextPageNumber = leftPageNumber + 10;

        if (prevPageNumber > 0) {
            pageInfo.put("prevPageNumber", prevPageNumber);
        }
        if (nextPageNumber <= lastPageNumber) {
            pageInfo.put("nextPageNumber", nextPageNumber);
        }

        pageInfo.put("leftPageNumber", leftPageNumber);
        pageInfo.put("rightPageNumber", rightPageNumber);
        pageInfo.put("lastPageNumber", lastPageNumber);
        pageInfo.put("currentPageNumber", page);

        return Map.of("pageInfo", pageInfo,
                "commentList", commentMapper.selectCommentByMovieId(movieId, offset));
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

    public void editComment(MovieComment comment) {
        commentMapper.updateComment(comment);
    }
}
