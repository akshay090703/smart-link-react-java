package com.smartlink.scm.service;

import com.smartlink.scm.model.EmailDetails;
import org.springframework.http.ResponseEntity;

public interface EmailService {
    ResponseEntity<?> sendSimpleEmail(EmailDetails emailDetails);

    ResponseEntity<?> sendEmailWithAttachment(EmailDetails emailDetails);
}
