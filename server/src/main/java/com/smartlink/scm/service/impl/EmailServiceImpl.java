package com.smartlink.scm.service.impl;

import com.smartlink.scm.model.EmailDetails;
import com.smartlink.scm.service.EmailService;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.Objects;

@Service
public class EmailServiceImpl implements EmailService {
    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${app.domain}")
    private String domain;

    @Value("${spring.mail.username}")
    private String sender;

    @Override
    public ResponseEntity<?> sendSimpleEmail(EmailDetails emailDetails) {
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();

            if (!emailDetails.getFrom().isEmpty() && !emailDetails.getFrom().isBlank()) {
                emailDetails.setSubject("From " + emailDetails.getFrom() + ": " + emailDetails.getSubject());
            }

            mailMessage.setFrom(sender);
            mailMessage.setTo(emailDetails.getRecipient());
            mailMessage.setSubject(emailDetails.getSubject());
            mailMessage.setText(emailDetails.getBody());

            // Send the simple email
            javaMailSender.send(mailMessage);

            return new ResponseEntity<>(emailDetails, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<?> sendEmailWithAttachment(EmailDetails emailDetails) {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();

        try {
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);

            if (!emailDetails.getFrom().isEmpty() && !emailDetails.getFrom().isBlank()) {
                emailDetails.setSubject("From " + emailDetails.getFrom() + ": " + emailDetails.getSubject());
            }

            mimeMessageHelper.setTo(sender);
            mimeMessageHelper.setTo(emailDetails.getRecipient());
            mimeMessageHelper.setSubject(emailDetails.getSubject());
            mimeMessageHelper.setText(emailDetails.getBody());

            // Add attachment if present
            if (emailDetails.getAttachment() != null && !emailDetails.getAttachment().isEmpty()) {
                mimeMessageHelper.addAttachment(Objects.requireNonNull(emailDetails.getAttachment().getOriginalFilename()), emailDetails.getAttachment());
            }

            // Send the email with attachment
            javaMailSender.send(mimeMessage);

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
