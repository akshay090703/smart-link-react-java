package com.smartlink.scm.service.impl;

import com.smartlink.scm.helpers.ResourceNotFoundException;
import com.smartlink.scm.model.User;
import com.smartlink.scm.repo.UserRepo;
import com.smartlink.scm.service.AuthService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AuthServiceImpl implements AuthService {
    @Autowired
    private UserRepo userRepo;

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Override
    public User saveUser(User user) {
        String userId = UUID.randomUUID().toString();
        user.setUserId(userId);

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
}
