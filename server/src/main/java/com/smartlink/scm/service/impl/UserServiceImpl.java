package com.smartlink.scm.service.impl;

import com.smartlink.scm.forms.UserUpdateForm;
import com.smartlink.scm.model.ProfileResponse;
import com.smartlink.scm.model.User;
import com.smartlink.scm.repo.UserRepo;
import com.smartlink.scm.service.ImageService;
import com.smartlink.scm.service.JwtUtil;
import com.smartlink.scm.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private AuthServiceImpl authService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepo repo;

    @Autowired
    private ImageService imageService;

    @Override
    public ResponseEntity<?> getProfile(HttpServletRequest request) {
//        System.out.println("getProfile");
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

        // Validate the JWT and extract email
        if (jwt != null) {
            email = jwtUtil.extractEmail(jwt);
        }

        if(email == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        Optional<User> user = repo.findByEmail(email);

        if(user.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        ProfileResponse profileResponse = getProfileResponse(user.get());

        return new ResponseEntity<>(profileResponse, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> updateForm(UserUpdateForm userForm, String id) {
        Optional<User> user = authService.getUserById(id);

        if(user.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        if(userForm.getProfileImage() != null && !userForm.getProfileImage().isEmpty()) {
            String cloudinaryPublicId = user.get().getCloudinaryPublicId();
            if(cloudinaryPublicId != null && !cloudinaryPublicId.isEmpty()) {
                imageService.deleteImage(cloudinaryPublicId);
            }

            String newPublicId = UUID.randomUUID().toString();
            String fileUrl = imageService.uploadImage(userForm.getProfileImage(), newPublicId);

            user.get().setCloudinaryPublicId(newPublicId);
            user.get().setProfilePic(fileUrl);
        }

        user.get().setName(userForm.getName());
        user.get().setEmail(userForm.getEmail());
        user.get().setPhoneNumber(userForm.getPhoneNumber());
        user.get().setAbout(userForm.getAbout());

        User newUser = repo.save(user.get());
        ProfileResponse profileResponse = getProfileResponse(newUser);

        return new ResponseEntity<>(profileResponse, HttpStatus.OK);
    }

    private static ProfileResponse getProfileResponse(User user) {
        ProfileResponse profileResponse = new ProfileResponse();

        profileResponse.setId(user.getUserId());
        profileResponse.setName(user.getName());
        profileResponse.setEmail(user.getEmail());
        profileResponse.setAbout(user.getAbout());
        profileResponse.setProfilePic(user.getProfilePic());
        profileResponse.setPhoneNumber(user.getPhoneNumber());
        profileResponse.setEnabled(user.isEnabled());
        profileResponse.setEmailVerified(user.isEmailVerified());
        profileResponse.setPhoneVerified(user.isPhoneVerified());
//        profileResponse.setContacts(user.getContacts());
        return profileResponse;
    }
}
