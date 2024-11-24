package com.smartlink.scm.service;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;

public interface UserService {
    ResponseEntity<?> getProfile(HttpServletRequest request);
}
