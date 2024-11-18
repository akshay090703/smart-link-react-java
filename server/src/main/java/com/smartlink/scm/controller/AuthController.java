package com.smartlink.scm.controller;

import com.smartlink.scm.forms.UserForm;
import com.smartlink.scm.service.impl.AuthServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    @Autowired
    private AuthServiceImpl authService;

    @PostMapping("/auth/signup")
    public ResponseEntity<String> registerUser(@RequestBody UserForm form) {
        System.out.println(form);

        return new ResponseEntity<>("Registering user", HttpStatus.CREATED);
    }
}
