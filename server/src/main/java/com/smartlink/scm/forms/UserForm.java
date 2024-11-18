package com.smartlink.scm.forms;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserForm {
    private String username;
    private String email;
    private String password;
    private String phone;
    private String about;
}
