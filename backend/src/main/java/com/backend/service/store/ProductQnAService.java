package com.backend.service.store;


import com.backend.domain.store.ProductQnA;
import com.backend.mapper.store.ProductQnAMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ProductQnAService {

    private final ProductQnAMapper mapper;

    public void addQnA(ProductQnA productQnA) {

        mapper.addQnA(productQnA);
    }

    public Map<String, Object> listQnA(Integer productId, Integer page) {

        if (page == null || page < 1) {
            page = 1;
        }

        Map pageInfo = new HashMap();

        Integer offset = (page - 1) * 10 + 1;

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
        pageInfo.put("prevPageNumber", prevPageNumber);
        pageInfo.put("nextPageNumber", nextPageNumber);


        return Map.of("listQnA", mapper.listQnA(productId, offset),
                "pageInfo", pageInfo);
    }

    public void deleteQnA(Integer id) {

        mapper.deleteQnA(id);
    }

    public void modifyQnA(ProductQnA productQnA) {

        mapper.modifyQnA(productQnA);
    }
}
