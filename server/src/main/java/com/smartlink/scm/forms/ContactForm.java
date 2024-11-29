package com.smartlink.scm.forms;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContactForm {
    @NotBlank(message = "Name is required")
    private String name;
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid Email Address")
    private String email;
    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[0-9]{8,}$", message = "Invalid Phone Number")
    private String phone;
    @NotBlank(message = "Address is required!")
    private String address;
    private String description;
    private String website;
    private String socialLink;
    private Boolean isFavorite;

    private String profilePhoto;
}
