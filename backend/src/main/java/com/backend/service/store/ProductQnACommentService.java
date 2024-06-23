package com.backend.service.store;


import com.backend.domain.store.ProductQnAComment;
import com.backend.mapper.store.ProductQnACommentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class ProductQnACommentService {


    private final ProductQnACommentMapper mapper;

    public void addQnAComment(ProductQnAComment qnAComment) {

        mapper.addQnAComment(qnAComment);
    }

    public List<ProductQnAComment> readQnAComment(Integer idQnA) {

        return mapper.readQnAComment(idQnA);
    }
}
