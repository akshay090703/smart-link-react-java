package com.smartlink.scm.controller;

import com.smartlink.scm.model.EmailDetails;
import com.smartlink.scm.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmailController {
    @Autowired
    private EmailService emailService;

    @PostMapping("/sendMail")
    public ResponseEntity<?> sendMail(@RequestBody EmailDetails emailDetails) {
        if(emailDetails.getAttachment() == null || emailDetails.getAttachment().isEmpty()) {
            return emailService.sendSimpleEmail(emailDetails);
        }

        return emailService.sendEmailWithAttachment(emailDetails);
    }
}
