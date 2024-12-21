package com.smartlink.scm.model;

import com.smartlink.scm.validators.ValidFile;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmailDetails {
    private String from;
    @Email(message = "Not a valid email")
    private String recipient;
    @NotEmpty(message = "Must not be empty")
    private String subject;
    private String body;
    private MultipartFile attachment;
}
