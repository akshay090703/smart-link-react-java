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

@Service
public class EmailServiceImpl implements EmailService {
    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${app.domain}")
    private String domain;

    @Override
    public ResponseEntity<?> sendSimpleEmail(EmailDetails emailDetails) {
        try{
            SimpleMailMessage mailMessage = new SimpleMailMessage();

            if(emailDetails.getFrom().isEmpty() || emailDetails.getFrom().isBlank()) {
                mailMessage.setFrom("smartlink@" + domain);
            } else {
                int atIndex = emailDetails.getFrom().indexOf("@");
                String beforeAt = emailDetails.getFrom().substring(0, atIndex);
                mailMessage.setFrom(beforeAt + "@" + domain);
            }
            mailMessage.setTo(emailDetails.getRecipient());
            mailMessage.setSubject(emailDetails.getSubject());
            mailMessage.setText(emailDetails.getBody());

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

        MimeMessageHelper mimeMessageHelper;

        try{
            mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);

            if(emailDetails.getFrom().isEmpty() || emailDetails.getFrom().isBlank()) {
                mimeMessageHelper.setFrom("smartlink@" + domain);
            } else {
                int atIndex = emailDetails.getFrom().indexOf("@");
                String beforeAt = emailDetails.getFrom().substring(0, atIndex);
                mimeMessageHelper.setFrom(beforeAt + "@" + domain);

                System.out.println(beforeAt + "@" + domain);
            }

            mimeMessageHelper.setTo(emailDetails.getRecipient());
            mimeMessageHelper.setSubject(emailDetails.getSubject());
            mimeMessageHelper.setText(emailDetails.getBody());

            if(emailDetails.getAttachment() != null) {
                mimeMessageHelper.addAttachment(emailDetails.getAttachment().getOriginalFilename(), emailDetails.getAttachment());
            }

            javaMailSender.send(mimeMessage);
            return new ResponseEntity<>(emailDetails, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
