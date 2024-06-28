package com.backend.controller.member;

import com.backend.domain.member.Member;
import com.backend.domain.store.ProductOrder;
import com.backend.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService service;

    @GetMapping("{nickName}")
    public ResponseEntity checkNickName(@PathVariable String nickName) {
        if (service.get(nickName) == null) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.CONFLICT).build();
    }

    @PostMapping("signup")
    public ResponseEntity signup(@RequestBody Member member) {
        service.add(member);
        return ResponseEntity.ok().build();
    }

    @PostMapping("token")
    public ResponseEntity token(@RequestBody Member member) {
        Map<String, Object> map = service.getToken(member);
        if (map != null) {
            return ResponseEntity.ok(map);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @GetMapping("mypage/{nickName}")
    public Member myPageMemberInfo(@PathVariable String nickName) {

        System.out.println("nickName =" + nickName);

        return service.get(nickName);
    }

    @PutMapping("mypage/updatePassword")
    public void updatePassword(@RequestBody Member member) {

        service.updatePassword(member);
    }

    @GetMapping("mypage/paymentResult/{nickName}")
    public Map<String, Object> paymentResult(@PathVariable String nickName, @RequestParam(value = "page", defaultValue = "1") Integer page) {

        System.out.println("page = " + page);
        return service.paymentResult(nickName, page);
    }

    @GetMapping("/list-all")
    public List<Member> getAllMembers() {
        return service.getAllMembers();
    }

    @GetMapping("mypage/paymentCancelResult/{nickName}")
    public Map<String, Object> paymentCancelResult(@PathVariable String nickName, @RequestParam(value = "page", defaultValue = "1") Integer page) {

        return service.paymentCancelResult(nickName, page);
    }

    @GetMapping("mypage/paymentOrderItem/{paymentId}")
    public List<ProductOrder> paymentOrderItem(@PathVariable Integer paymentId) {

        return service.paymentOrderItem(paymentId);

    }

}
