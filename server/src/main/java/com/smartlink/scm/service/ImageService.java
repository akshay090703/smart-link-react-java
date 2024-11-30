package com.smartlink.scm.service;

import org.springframework.web.multipart.MultipartFile;

public interface ImageService {
    String uploadImage(MultipartFile file);

    String getUrlFromPublicId(String publicId);
}
