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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Objects;
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

    private Logger logger = LoggerFactory.getLogger(ContactController.class);

    @PostMapping("/add")
    public ResponseEntity<?> addContact(HttpServletRequest request, @Valid @ModelAttribute ContactForm contactForm, BindingResult result) {
//        System.out.println(contactForm);

//        System.out.println(result);

        if(result.hasErrors()) {
//            System.out.println("sdfdsfds");
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }

//        System.out.println(contactForm);

        Contact createdContact = contactService.createContact(contactForm, request);

        return new ResponseEntity<>(createdContact, HttpStatus.CREATED);
    }

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

//        return new ResponseEntity<>(Map.of(
//                "contacts", contactsList,
//                "totalPages", contactsList.getTotalPages(),
//                "currentPage", contactsList.getNumber()
//        ), HttpStatus.OK);
        return new ResponseEntity<>(contactsList, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchContacts(@RequestParam("selectedCategory") String field, @RequestParam("searchText") String value, @RequestParam(value = "page", defaultValue = "0") int page, @RequestParam(value = "size", defaultValue = "10") int size, @RequestParam(value = "sortBy", defaultValue = "name") String sortBy, @RequestParam(value = "order", defaultValue = "asc") String order, HttpServletRequest request) {
        if(field.isEmpty()) {
            return getAllContacts(request, page, size, sortBy, order);
        }

        logger.info("field {} value {}", field, value);

        Page<Contact> contacts = null;
//        System.out.println(size);

        if(field.equalsIgnoreCase("name")) {
            contacts = contactService.searchByName(value, size, page, sortBy, order);
        } else if(field.equalsIgnoreCase("email")) {
            contacts = contactService.searchByEmail(value, size, page, sortBy, order);
        } else if(field.equalsIgnoreCase("phoneNumber")) {
            contacts = contactService.searchByPhone(value, size, page, sortBy, order);
        }

        return new ResponseEntity<>(contacts, HttpStatus.OK);
    }

    @GetMapping("/{contactId}")
    public ResponseEntity<?> getContact(@PathVariable String contactId) {
        Optional<Contact> contact = contactService.getContactById(contactId);

        if(contact.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(contact.get(), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteContact(@PathVariable String id) {
        return contactService.deleteContact(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateContact(@PathVariable String id, @RequestBody ContactForm contactForm, BindingResult result) {
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

