package com.backend.controller.store;

import com.backend.domain.store.ProductComment;
import com.backend.service.store.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/store/product/comment")
@RestController
@RequiredArgsConstructor
public class CommentController {

    private final CommentService service;

    @PostMapping("/add")
    public void addComment(@RequestBody ProductComment productComment) {

        service.addComment(productComment);
    }

    @GetMapping("/list/{productId}")
    public List<ProductComment> list(@PathVariable Integer productId) {

        return service.commentList(productId);
    }

    @PutMapping("/modify")
    public void modifyComment(@RequestBody ProductComment productComment) {

        service.modifyComment(productComment);
    }

    @DeleteMapping("/delete/{commentId}")
    public void deleteComment(@PathVariable Integer commentId) {

        service.deleteComment(commentId);
    }


}
