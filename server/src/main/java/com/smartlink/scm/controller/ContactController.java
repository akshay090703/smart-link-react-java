package com.smartlink.scm.controller;

import com.smartlink.scm.forms.ContactForm;
import com.smartlink.scm.model.Contact;
import com.smartlink.scm.service.ContactService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user/contacts")
public class ContactController {
    @Autowired
    private ContactService contactService;

    @PostMapping("/add")
    public ResponseEntity<?> addContact(HttpServletRequest request, @Valid @ModelAttribute ContactForm contactForm, BindingResult result) {
        if(result.hasErrors()) {
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }

//        System.out.println(contactForm);

        Contact createdContact = contactService.createContact(contactForm, request);

        return new ResponseEntity<>(createdContact, HttpStatus.CREATED);
    }
}
