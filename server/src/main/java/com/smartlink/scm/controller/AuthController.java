package com.smartlink.scm.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    @GetMapping("/")
    public ResponseEntity<String> home() {
        System.out.println("home");
        return new ResponseEntity<>("Hello World", HttpStatus.OK);
    }
}
