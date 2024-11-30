package com.smartlink.scm.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProfileResponse {
    private String name;
    private String email;
    private String about;
    private String profilePic;
    private String phoneNumber;

    // info
    private boolean enabled = false;
    private boolean emailVerified = false;
    private boolean phoneVerified = false;

//    private List<Contact> contacts = new ArrayList<>();
}
