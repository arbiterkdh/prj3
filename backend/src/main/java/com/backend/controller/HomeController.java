package com.backend.controller;

import com.backend.service.HomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class HomeController {

    private final HomeService homeService;

    @PostMapping("add")
    public void home(@RequestParam(value = "files[]", required = false) MultipartFile[] files) throws IOException {

//        homeService.add(files);
    }
}

//private final BoardMapper mapper;
//private final MemberMapper memberMapper;
//final S3Client s3Client;
//private final CommentMapper commentMapper;
//
//@Value("${aws.s3.bucket.name}")
//String bucketName;
//
//@Value("${image.src.prefix}")
//String srcPrefix;
//
//public void add(Board board, MultipartFile[] files, Authentication authentication) throws IOException {
//    board.setMemberId(Integer.valueOf(authentication.getName()));
//    // 게시물 저장
//    mapper.insert(board);
//
//    if (files != null) {
//        for (MultipartFile file : files) {
//            // db에 해당 게시물의 파일 목록 저장
//            mapper.insertFileName(board.getId(), file.getOriginalFilename());
//            // 실제 파일 저장 (s3)
//            String key = STR."prj2/\{board.getId()}/\{file.getOriginalFilename()}";
//            PutObjectRequest objectRequest = PutObjectRequest.builder()
//                    .bucket(bucketName)
//                    .key(key)
//                    .acl(ObjectCannedACL.PUBLIC_READ)
//                    .build();
//
//            s3Client.putObject(objectRequest,
//                    RequestBody.fromInputStream(file.getInputStream(), file.getSize()));
//
//        }
//    }
