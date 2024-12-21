package com.smartlink.scm.model;

import com.smartlink.scm.validators.ValidFile;
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
    @NotEmpty
    private String recipient;
    @NotEmpty
    private String subject;
    private String body;
    @ValidFile
    private MultipartFile attachment;
}
