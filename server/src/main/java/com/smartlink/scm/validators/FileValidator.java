package com.smartlink.scm.validators;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.web.multipart.MultipartFile;

public class FileValidator implements ConstraintValidator<ValidFile, MultipartFile> {
    // 5 MB
    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024;


    @Override
    public boolean isValid(MultipartFile file, ConstraintValidatorContext context) {
        if (file == null || file.isEmpty()) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("File can not be empty").addConstraintViolation();

            return false;
        }

        if(file.getSize() > MAX_FILE_SIZE) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("File size exceeds 5MB size").addConstraintViolation();

            return false;
        }

//        try {
//            BufferedImage image = ImageIO.read(file.getInputStream());
//
//            if(image.getHeight() > image.getWidth()) {
//                context.disableDefaultConstraintViolation();
//                context.buildConstraintViolationWithTemplate("Image size exceeds 5MB size");
//                return false;
//            }
//        } catch (IOException e) {
//            throw new RuntimeException(e);
//        }

        return true;
    }
}
