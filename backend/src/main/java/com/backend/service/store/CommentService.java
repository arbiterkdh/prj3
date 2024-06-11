package com.backend.service.store;


import com.backend.domain.store.ProductComment;
import com.backend.mapper.store.CommentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentMapper mapper;

    public void addComment(ProductComment productComment) {

        mapper.addComment(productComment);
    }

    public List<ProductComment> commentList(Integer productId) {

        return mapper.commentList(productId);

    }

    public void modifyComment(ProductComment productComment) {

        mapper.modifyComment(productComment);
    }

    public void deleteComment(Integer commentId) {

        mapper.deleteComment(commentId);
    }
}
