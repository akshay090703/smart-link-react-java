package com.smartlink.scm.service;

import com.smartlink.scm.forms.UserUpdateForm;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;

public interface UserService {
    ResponseEntity<?> getProfile(HttpServletRequest request);

    ResponseEntity<?> updateForm(@Valid UserUpdateForm userForm, String id);
}
