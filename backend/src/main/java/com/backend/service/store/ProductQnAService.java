package com.backend.service.store;


import com.backend.domain.store.ProductQnA;
import com.backend.mapper.store.ProductQnACommentMapper;
import com.backend.mapper.store.ProductQnAMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class ProductQnAService {

    private final ProductQnAMapper mapper;

    private final ProductQnACommentMapper qnACommentMapper;

    public void addQnA(ProductQnA productQnA) {

        mapper.addQnA(productQnA);
    }

    public Map<String, Object> listQnA(Integer productId, Integer page) {


        Map pageInfo = new HashMap();

        Integer offset = (page - 1) * 10;

        Integer totalCount = mapper.totalCount(productId);

        Integer lastPageNumber = (totalCount - 1) / 10 + 1;
        Integer leftPageNumber = (page - 1) / 10 * 10 + 1;
        Integer rightPageNumber = leftPageNumber + 9;

        rightPageNumber = Math.min(rightPageNumber, lastPageNumber);

        Integer prevPageNumber = leftPageNumber - 1;
        Integer nextPageNumber = rightPageNumber + 1;

        pageInfo.put("leftPageNumber", leftPageNumber);
        pageInfo.put("currentPage", page);
        pageInfo.put("lastPageNumber", lastPageNumber);
        pageInfo.put("rightPageNumber", rightPageNumber);

        if (prevPageNumber > 0) {
            pageInfo.put("prevPageNumber", prevPageNumber);
        }
        if (nextPageNumber <= lastPageNumber) {
            pageInfo.put("nextPageNumber", nextPageNumber);
        }


        return Map.of("listQnA", mapper.listQnA(productId, offset),
                "pageInfo", pageInfo);
    }

    public void deleteQnA(Integer id) {

        qnACommentMapper.deleteQnAComment(id);

        mapper.deleteQnA(id);
    }

    public void modifyQnA(ProductQnA productQnA) {

        mapper.modifyQnA(productQnA);
    }
}
