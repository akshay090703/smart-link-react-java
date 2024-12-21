package com.smartlink.scm.controller;

import com.smartlink.scm.model.EmailDetails;
import com.smartlink.scm.service.EmailService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class EmailController {
    @Autowired
    private EmailService emailService;

    @PostMapping("/sendMail")
    public ResponseEntity<?> sendMail(@Valid @ModelAttribute EmailDetails emailDetails,
                                      BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            System.out.println(bindingResult);
            return new ResponseEntity<>(bindingResult.getAllErrors(), HttpStatus.BAD_REQUEST);
        }

        if (emailDetails.getAttachment() == null || emailDetails.getAttachment().isEmpty()) {
            return emailService.sendSimpleEmail(emailDetails);
        }

        // Ensure that the multipart file is handled separately
        return emailService.sendEmailWithAttachment(emailDetails);
    }
}
