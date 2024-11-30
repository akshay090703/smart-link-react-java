package com.smartlink.scm.controller;

import com.smartlink.scm.service.UserService;
import com.smartlink.scm.service.impl.UserServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/dashboard")
    public ResponseEntity<String> dashboard() {
        return new ResponseEntity<>("Hello World", HttpStatus.OK);
    }

    @GetMapping("/profile")
    public ResponseEntity<?> profile(HttpServletRequest request) {
        return userService.getProfile(request);
    }
}
