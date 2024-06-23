package com.backend.controller.store;


import com.backend.domain.store.ProductQnAComment;
import com.backend.service.store.ProductQnACommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/store/qna/comment")
public class ProductQnACommentController {

    private final ProductQnACommentService service;

    @PostMapping("/add")
    public void addComment(@RequestBody ProductQnAComment qnAComment) {

        service.addQnAComment(qnAComment);
    }

    @GetMapping("/read/{idQnA}")
    public List<ProductQnAComment> readProductQnAComment(@PathVariable Integer idQnA) {

        List<ProductQnAComment> comment = service.readQnAComment(idQnA);

        return comment;
    }
}
