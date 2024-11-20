package com.smartlink.scm.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordService {
    private final BCryptPasswordEncoder passwordEncoder;

    public PasswordService(BCryptPasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    public String encryptPassword(String password) {
        return passwordEncoder.encode(password);
    }

    public boolean matches(String password, String hashedPassword) {
        return passwordEncoder.matches(password, hashedPassword);
    }
}
