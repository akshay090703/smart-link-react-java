package com.smartlink.scm.controller;

import com.smartlink.scm.forms.JwtResponse;
import com.smartlink.scm.forms.LoginForm;
import com.smartlink.scm.forms.UserForm;
import com.smartlink.scm.model.EmailDetails;
import com.smartlink.scm.model.Providers;
import com.smartlink.scm.model.User;
import com.smartlink.scm.service.EmailService;
import com.smartlink.scm.service.JwtUtil;
import com.smartlink.scm.service.impl.AuthServiceImpl;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthServiceImpl authService;

    @Value("${app.defaultProfilePic}")
    private String defaultProfilePic;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private EmailService emailService;

    @PostMapping("/signup")
    public ResponseEntity<User> registerUser(@Valid @RequestBody UserForm form, BindingResult rBindingResult) {
        System.out.println(form);

        if(rBindingResult.hasErrors()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        User user = new User();
        user.setName(form.getUsername());
        user.setEmail(form.getEmail().toLowerCase());
        user.setPassword(form.getPassword());
        user.setAbout(form.getAbout());
        user.setPhoneNumber(form.getPhone());
        user.setProfilePic(defaultProfilePic);


        User createdUser = authService.saveUser(user);

        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginForm form, BindingResult bindingResult, HttpServletResponse response) {
//        System.out.println(form);

        if(bindingResult.hasErrors()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return authService.loginUser(form, response);
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        return authService.logoutUser(response);
    }

    @GetMapping("/isLoggedIn")
    public ResponseEntity<?> isLoggedIn(HttpServletRequest request) {
        return authService.isUserLoggedIn(request);
    }

    @PostMapping("/verifyEmail")
    public ResponseEntity<?> verifyEmail(@RequestBody Map<String, String> request) {
        String email = request.get("email");

        return authService.verifyEmail(email);
    }

    @PostMapping("/verifyAccount")
    public ResponseEntity<?> verifyAccount(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = request.get("otp");

        return authService.verifyAccount(email, otp);
    }
}
