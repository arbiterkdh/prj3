package com.backend.controller.store;

import com.backend.domain.store.ProductComment;
import com.backend.service.store.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/store/product/comment")
@RestController
@RequiredArgsConstructor
public class CommentController {

    private final CommentService service;

    @PostMapping("/add")
    public void addComment(@RequestBody ProductComment productComment) {


    }


}
