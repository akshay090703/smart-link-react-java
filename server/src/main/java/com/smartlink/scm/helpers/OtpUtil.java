package com.smartlink.scm.helpers;

import com.smartlink.scm.model.EmailDetails;
import com.smartlink.scm.model.OtpVerification;
import com.smartlink.scm.repo.OtpRepo;
import com.smartlink.scm.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.security.SecureRandom;
import java.time.LocalDateTime;

@Component
public class OtpUtil {
    @Autowired
    private OtpRepo otpRepo;

    @Autowired
    private EmailService emailService;

    private static final SecureRandom random = new SecureRandom();

    public void generateAndSaveOtp(String email) {
        String otp = generateOtp();
        LocalDateTime expiryTime = LocalDateTime.now().plusMinutes(5);

        OtpVerification otpVerification = new OtpVerification();
        otpVerification.setOtp(otp);
        otpVerification.setExpiryTime(expiryTime);
        otpVerification.setOwnerEmail(email);
        otpRepo.save(otpVerification);

        EmailDetails emailDetails = new EmailDetails();
        emailDetails.setRecipient(email);
        emailDetails.setSubject("Validate Your Account");
        String emailBody = String.format(
                "Hello,\n\nYour OTP code is: %s\n\nThis OTP is valid for 5 minutes.\n\nBest Regards",
                otp
        );
        emailDetails.setBody(emailBody);

        emailService.sendSimpleEmail(emailDetails);
    }

    private String generateOtp() {
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }

    public boolean verifyOtp(String email, String otp) {
        OtpVerification verification = otpRepo.findByOwnerEmail(email);

        if (verification != null && verification.getOtp().equals(otp)) {
            if(verification.getExpiryTime().isAfter(LocalDateTime.now())) {
                otpRepo.delete(verification);
                return true;
            }
        }

        return false;
    }
}
