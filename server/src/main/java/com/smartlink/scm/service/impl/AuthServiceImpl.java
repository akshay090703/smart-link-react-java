package com.smartlink.scm.service.impl;

import com.smartlink.scm.forms.JwtResponse;
import com.smartlink.scm.forms.LoginForm;
import com.smartlink.scm.helpers.AppConstants;
import com.smartlink.scm.helpers.ResourceNotFoundException;
import com.smartlink.scm.model.Providers;
import com.smartlink.scm.model.User;
import com.smartlink.scm.repo.UserRepo;
import com.smartlink.scm.service.AuthService;
import com.smartlink.scm.service.JwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AuthServiceImpl implements AuthService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Override
    public User saveUser(User user) {
        String userId = UUID.randomUUID().toString();
        user.setUserId(userId);

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        user.setRoleList(List.of(AppConstants.ROLE_USER));

        logger.info(user.getProvider().toString());

        return userRepo.save(user);
    }

    @Override
    public Optional<User> getUserById(String id) {
        return userRepo.findById(id);
    }

    @Override
    public Optional<User> updateUser(User user) {
        Optional<User> user1 = userRepo.findById(user.getUserId());

        if(user1.isPresent()) {
            user1.get().setName(user.getName());
            user1.get().setEmail(user.getEmail());
            user1.get().setPassword(user.getPassword());
            user1.get().setAbout(user.getAbout());
            user1.get().setPhoneNumber(user.getPhoneNumber());
            user1.get().setProfilePic(user.getProfilePic());
            user1.get().setEnabled(user.isEnabled());
            user1.get().setEmailVerified(user.isEmailVerified());
            user1.get().setPhoneVerified(user.isPhoneVerified());
            user1.get().setProvider(user.getProvider());
            user1.get().setProviderId(user.getProviderId());

            User savedUser = userRepo.save(user1.get());

            return Optional.of(savedUser);
        } else {
            return Optional.empty();
        }
    }

    @Override
    public void deleteUser(String id) {
        User user = userRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));

        userRepo.delete(user);
    }

    @Override
    public boolean isUserExist(String userId) {
        Optional<User> user = userRepo.findById(userId);

        return user.isPresent();
    }

    @Override
    public boolean isUserExistByEmail(String email) {
        Optional<User> user = userRepo.findByEmail(email);

        return user.isPresent();
    }

    @Override
    public Optional<List<User>> getAllUsers() {
        return Optional.of(userRepo.findAll());
    }

    @Override
    public Optional<User> getUserByEmail(String email) {

        return userRepo.findByEmail(email);
    }

    public ResponseEntity<?> loginUser(LoginForm form, HttpServletResponse response) {
        String email = form.getLoginEmail();
        String password = form.getLoginPassword();

        Optional<User> user = userRepo.findByEmail(email);

        if(!user.isPresent()) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }

        if(!passwordEncoder.matches(password, user.get().getPassword())) {
            return new ResponseEntity<>("Wrong password", HttpStatus.UNAUTHORIZED);
        }

        user.get().setProvider(Providers.SELF);
        userRepo.save(user.get());

        String token = jwtUtil.generateToken(email);

        Cookie cookie = new Cookie("JWT_TOKEN", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(60 * 60 * 24);
        response.addCookie(cookie);

        System.out.println("Cookie added: " + cookie.getName());

        return new ResponseEntity<>(new JwtResponse(token),HttpStatus.OK);
    }

    public ResponseEntity<?> logoutUser(HttpServletResponse response) {
        Cookie cookie = new Cookie("JWT_TOKEN", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);

        // not necessary as we are not maintaining any authentication state
        // on the server (STATELESS authorization)
        SecurityContextHolder.clearContext();

        Cookie googleCookie = new Cookie("JSESSIONID", null);
        googleCookie.setPath("/");
        googleCookie.setHttpOnly(true);
        googleCookie.setMaxAge(0);
        response.addCookie(googleCookie);

        response.setStatus(HttpServletResponse.SC_OK);

        return new ResponseEntity<>("Logout successful", HttpStatus.OK);
    }

    public ResponseEntity<?> isUserLoggedIn(HttpServletRequest request) {
        String jwt = null;
        String email = null;

        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("JWT_TOKEN".equals(cookie.getName())) {
                    jwt = cookie.getValue();
                    break;
                }
            }
        }

        if (jwt != null) {
            email = jwtUtil.extractEmail(jwt);
        }

        if(email != null) {
            Optional<User> user = getUserByEmail(email);

            if(jwtUtil.isTokenValid(jwt, email)) {
                System.out.println("User already logged in");
                return new ResponseEntity<>(new JwtResponse(jwt), HttpStatus.OK);
            }
        }

        System.out.println("Unauthorized");

        return new ResponseEntity<>("User not authenticated", HttpStatus.UNAUTHORIZED);
    }
}
