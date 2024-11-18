package com.smartlink.scm.service;

import com.smartlink.scm.model.User;

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

}
