package com.backend.controller.store;

import com.backend.domain.store.ProductComment;
import com.backend.service.store.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequestMapping("/api/store/product/comment")
@RestController
@RequiredArgsConstructor
public class CommentController {

    private final CommentService service;

    @PostMapping("/add")
    public void addComment(ProductComment productComment) {

        service.addComment(productComment);
    }

    @GetMapping("/list/{productId}")
    public Map<String, Object> list(@PathVariable Integer productId, @RequestParam(defaultValue = "1") Integer page) {

        return service.commentList(productId, page);
    }

    @PutMapping("/modify")
    public void modifyComment(ProductComment productComment) {

        service.modifyComment(productComment);
    }

    @DeleteMapping("/delete/{commentId}")
    public void deleteComment(@PathVariable Integer commentId) {

        service.deleteComment(commentId);
    }


}
