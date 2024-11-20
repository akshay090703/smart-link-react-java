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
public class LoginForm {
    @Email(message = "Invalid Email Address")
    private String loginEmail;
    @NotBlank(message = "Password is required!")
    @Size(min = 6, message = "Min 6 Characters is required")
    private String loginPassword;
}
