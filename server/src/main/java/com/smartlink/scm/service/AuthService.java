package com.smartlink.scm.service;

import com.smartlink.scm.forms.LoginForm;
import com.smartlink.scm.model.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface AuthService {
    User saveUser(User user);
    Optional<User> getUserById(String id);
    Optional<User> updateUser(User user);
    void deleteUser(String id);
    boolean isUserExist(String userId);
    boolean isUserExistByEmail(String username);
    Optional<List<User>> getAllUsers();
    ResponseEntity<?> loginUser(@Valid LoginForm form, HttpServletResponse response);
    public ResponseEntity<?> logoutUser(HttpServletResponse response);
    public ResponseEntity<?> isUserLoggedIn(HttpServletRequest request);
}
