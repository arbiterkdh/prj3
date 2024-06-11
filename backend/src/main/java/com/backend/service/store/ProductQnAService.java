package com.backend.service.store;


import com.backend.domain.store.ProductQnA;
import com.backend.mapper.store.ProductQnAMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductQnAService {

    private final ProductQnAMapper mapper;

    public void addQnA(ProductQnA productQnA) {

        mapper.addQnA(productQnA);
    }

    public List<ProductQnA> listQnA() {

        return mapper.listQnA();

    }

    public void deleteQnA(Integer id) {

        mapper.deleteQnA(id);
    }

    public void modifyQnA(ProductQnA productQnA) {

        mapper.modifyQnA(productQnA);
    }
}
