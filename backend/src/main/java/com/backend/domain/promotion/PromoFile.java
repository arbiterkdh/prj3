package com.backend.domain.promotion;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PromoFile {
    private String fileType; // 파일 종류 (detail, recommended, thumbnail 등)
    private String fileName; // 파일 이름
    private String filePath; // 파일 경로

    public PromoFile(String fileType, String fileName) {
        this.fileType = fileType;
        this.fileName = fileName;
    }
}
