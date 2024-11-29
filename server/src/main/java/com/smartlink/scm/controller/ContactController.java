package com.smartlink.scm.controller;

import com.smartlink.scm.forms.ContactForm;
import com.smartlink.scm.service.ContactService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/user/contacts")
public class ContactController {
    @Autowired
    private ContactService contactService;

    @PostMapping("/add")
    public ResponseEntity<?> addContact(HttpServletRequest request, @Valid @RequestBody ContactForm contactForm, BindingResult result) {
        if(result.hasErrors()) {
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }

        System.out.println(contactForm);

        contactService.createContact(contactForm, request);

        return null;
    }
}
