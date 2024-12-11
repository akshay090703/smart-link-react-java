package com.smartlink.scm.controller;

import com.smartlink.scm.forms.ContactForm;
import com.smartlink.scm.helpers.TokenUtil;
import com.smartlink.scm.model.Contact;
import com.smartlink.scm.model.User;
import com.smartlink.scm.service.AuthService;
import com.smartlink.scm.service.ContactService;
import com.smartlink.scm.service.impl.AuthServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user/contacts")
public class ContactController {
    @Autowired
    private ContactService contactService;

    @Autowired
    private AuthService authService;

    @Autowired
    private TokenUtil tokenUtil;

    @PostMapping("/add")
    public ResponseEntity<?> addContact(HttpServletRequest request, @Valid @ModelAttribute ContactForm contactForm, BindingResult result) {
        if(result.hasErrors()) {
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }

//        System.out.println(contactForm);

        Contact createdContact = contactService.createContact(contactForm, request);

        return new ResponseEntity<>(createdContact, HttpStatus.CREATED);
    }

    @GetMapping("")
    public ResponseEntity<?> getAllContacts(HttpServletRequest request, @RequestParam(value = "page", defaultValue = "0") int page, @RequestParam(value = "size", defaultValue = "10") int size, @RequestParam(value = "sortBy", defaultValue = "name") String sortBy, @RequestParam(value = "order", defaultValue = "asc") String order) {
        String email = tokenUtil.getEmailFromJwt(request);

        if(email == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        Optional<User> userByEmail = authService.getUserByEmail(email);

        if(userByEmail.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        Page<Contact> contactsList = contactService.getByUser(userByEmail.get(), page, size, sortBy, order);

        return new ResponseEntity<>(contactsList, HttpStatus.OK);
    }
}
