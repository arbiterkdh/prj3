package com.backend.service.store;


import com.backend.domain.store.ProductComment;
import com.backend.mapper.store.CommentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentMapper mapper;

    public void addComment(ProductComment productComment) {

        mapper.addComment(productComment);
    }

    public Map<String, Object> commentList(Integer productId, Integer page) {

        Map pageInfo = new HashMap();

        Integer offset = (page - 1) * 10;
        Integer totalCount = mapper.totalCommentCount(productId);

        Integer leftPageNumber = (page - 1) / 10 * 10 + 1;
        Integer rightPageNumber = leftPageNumber + 9;
        Integer lastPageNumber = (totalCount - 1) / 10 + 1;

        rightPageNumber = Math.min(rightPageNumber, lastPageNumber);

        Integer prevPageNumber = leftPageNumber - 1;
        Integer nextPageNumber = rightPageNumber + 1;


        pageInfo.put("currentPageNumber", page);
        pageInfo.put("lastPageNumber", lastPageNumber);
        pageInfo.put("leftPageNumber", leftPageNumber);
        pageInfo.put("rightPageNumber", rightPageNumber);
        if (prevPageNumber > 0) {
            pageInfo.put("prevPageNumber", prevPageNumber);
        }
        if (nextPageNumber <= lastPageNumber) {
            pageInfo.put("nextPageNumber", nextPageNumber);
        }


        List<ProductComment> commentList = mapper.commentList(productId, offset);


        return Map.of("commentList", commentList,
                "pageInfo", pageInfo);


    }

    public void modifyComment(ProductComment productComment) {

        mapper.modifyComment(productComment);
    }

    public void deleteComment(Integer commentId) {

        mapper.deleteComment(commentId);
    }
}
