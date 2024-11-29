package com.smartlink.scm.service.impl;

import com.smartlink.scm.forms.ContactForm;
import com.smartlink.scm.helpers.ResourceNotFoundException;
import com.smartlink.scm.helpers.TokenUtil;
import com.smartlink.scm.model.Contact;
import com.smartlink.scm.model.User;
import com.smartlink.scm.repo.ContactRepo;
import com.smartlink.scm.service.AuthService;
import com.smartlink.scm.service.ContactService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ContactServiceImpl implements ContactService {
    @Autowired
    private ContactRepo contactRepo;

    @Autowired
    private TokenUtil tokenUtil;

    @Autowired
    private AuthService authService;

    @Override
    public Contact createContact(ContactForm contact, HttpServletRequest request) {
        String contactId = UUID.randomUUID().toString();

        String userEmail = tokenUtil.getEmailFromJwt(request);

        User user = authService.getUserByEmail(userEmail).orElse(null);

        Contact newContact = new Contact();
        newContact.setId(contactId);
        newContact.setName(contact.getName());
        newContact.setEmail(contact.getEmail());
        newContact.setAddress(contact.getAddress());
        newContact.setDescription(contact.getDescription());
        newContact.setPhoneNumber(contact.getPhone());
        newContact.setWebsiteLink(contact.getWebsite());
        newContact.setLinkedinLink(contact.getSocialLink());
        newContact.setFavorite(contact.getIsFavorite());
        newContact.setPicture(contact.getProfilePhoto());
        newContact.setUser(user);

        return contactRepo.save(newContact);
    }

    @Override
    public Contact updateContact(ContactForm contact) {
        return null;
    }

    @Override
    public void deleteContact(String contactId) {
        Contact contact = contactRepo.findById(contactId).orElseThrow(() -> new ResourceNotFoundException("Contact not found with id: " + contactId));

        contactRepo.delete(contact);
    }

    @Override
    public Contact getById(String contactId) {
        return contactRepo.findById(contactId).orElseThrow(() -> new ResourceNotFoundException("Contact not found with id: " + contactId));
    }

    @Override
    public List<Contact> getAll() {
        return contactRepo.findAll();
    }

    @Override
    public List<Contact> searchContact(String name, String email, String phoneNumber) {
        return List.of();
    }

    @Override
    public List<Contact> getByUserId(String userId) {
        return contactRepo.findByUserId(userId);
    }
}