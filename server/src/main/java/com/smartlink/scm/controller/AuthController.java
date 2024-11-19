package com.smartlink.scm.controller;

import com.smartlink.scm.forms.UserForm;
import com.smartlink.scm.model.Providers;
import com.smartlink.scm.model.User;
import com.smartlink.scm.service.impl.AuthServiceImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthServiceImpl authService;

    @Value("${app.defaultProfilePic}")
    private String defaultProfilePic;

    @PostMapping("/signup")
    public ResponseEntity<User> registerUser(@Valid @RequestBody UserForm form, BindingResult rBindingResult) {
        System.out.println(form);
//        User user = User.builder()
//                .name(form.getUsername())
//                .email(form.getEmail())
//                .password(form.getPassword())
//                .about(form.getAbout())
//                .phoneNumber(form.getPhone())
//                .profilePic(defaultProfilePic)
//                .emailVerified(false)
//                .phoneVerified(false)
//                .build();

        if(rBindingResult.hasErrors()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        User user = new User();
        user.setName(form.getUsername());
        user.setEmail(form.getEmail());
        user.setPassword(form.getPassword());
        user.setAbout(form.getAbout());
        user.setPhoneNumber(form.getPhone());
        user.setProfilePic(defaultProfilePic);


        User createdUser = authService.saveUser(user);

        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }
}
