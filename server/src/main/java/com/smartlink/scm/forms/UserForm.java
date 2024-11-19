package com.smartlink.scm.forms;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserForm {
    @NotBlank(message = "Username is required!")
    @Size(min = 2, message = "Min 2 characters is required!")
    private String username;

    @Email(message = "Invalid Email Address")
    private String email;
    @NotBlank(message = "Password is required!")
    @Size(min = 6, message = "Min 6 Characters is required")
    private String password;
    @Size(min = 8, max = 12, message = "Invalid phone number")
    private String phone;
    @NotBlank(message = "About is required.")
    private String about;
}
