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
    public void addComment(@RequestBody ProductComment productComment) {

        service.addComment(productComment);
    }

    @GetMapping("/list/{productId}")
    public Map<String, Object> list(@PathVariable Integer productId, @RequestParam(defaultValue = "1") Integer page) {

        if (page == null || page < 1) {
            page = 1;
        }
        return service.commentList(productId, page);
    }

    @PutMapping("/modify")
    public void modifyComment(@RequestBody ProductComment productComment) {

        service.modifyComment(productComment);
    }

    @DeleteMapping("/delete/{commentId}")
    public void deleteComment(@PathVariable Integer commentId) {

        service.deleteComment(commentId);
    }

    @GetMapping("/isBuyer/{memberNumber}/{productId}")
    public Boolean isBuyer(@PathVariable Integer memberNumber, @PathVariable Integer productId) {

        Boolean isBuyer = service.isBuyer(memberNumber, productId);

        System.out.println("isBuyer = " + isBuyer);

        return isBuyer;
    }


}
