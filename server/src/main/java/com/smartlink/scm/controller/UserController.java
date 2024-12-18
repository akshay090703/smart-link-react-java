package com.smartlink.scm.controller;

import com.smartlink.scm.forms.UserUpdateForm;
import com.smartlink.scm.model.User;
import com.smartlink.scm.service.UserService;
import com.smartlink.scm.service.impl.UserServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

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

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@Valid @ModelAttribute UserUpdateForm userForm, BindingResult result, @PathVariable String id) {
        if(result.hasErrors()) {
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }

        return userService.updateForm(userForm, id);
    }
}
