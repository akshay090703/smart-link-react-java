package com.smartlink.scm.forms;

import com.smartlink.scm.validators.ValidFile;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserUpdateForm {
    @NotBlank(message = "Name is required!")
    @Size(min = 2, message = "Min 2 characters is required!")
    private String name;

    @Email(message = "Invalid Email Address")
    private String email;

    @Size(min = 8, max = 12, message = "Invalid phone number")
    private String phoneNumber;

    @NotBlank(message = "About is required.")
    private String about;

    @ValidFile(message = "Invalid File")
    private MultipartFile profileImage;
}
