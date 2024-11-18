package com.smartlink.scm.service.impl;

import com.smartlink.scm.model.User;
import com.smartlink.scm.repo.UserRepo;
import com.smartlink.scm.service.AuthService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {
    @Autowired
    private UserRepo userRepo;

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Override
    public User saveUser(User user) {
        return null;
    }

    @Override
    public Optional<User> getUserById(String id) {
        return Optional.empty();
    }

    @Override
    public Optional<User> updateUser(User user) {
        return Optional.empty();
    }

    @Override
    public void deleteUser(String id) {

    }

    @Override
    public boolean isUserExist(String userId) {
        return false;
    }

    @Override
    public boolean isUserExistByEmail(String username) {
        return false;
    }

    @Override
    public Optional<List<User>> getAllUsers() {
        return Optional.empty();
    }
}
