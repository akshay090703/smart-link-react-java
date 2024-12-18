package com.smartlink.scm.service.impl;

import com.smartlink.scm.forms.ContactForm;
import com.smartlink.scm.helpers.ResourceNotFoundException;
import com.smartlink.scm.helpers.TokenUtil;
import com.smartlink.scm.model.Contact;
import com.smartlink.scm.model.User;
import com.smartlink.scm.repo.ContactRepo;
import com.smartlink.scm.service.AuthService;
import com.smartlink.scm.service.ContactService;
import com.smartlink.scm.service.ImageService;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ContactServiceImpl implements ContactService {
    @Autowired
    private ContactRepo contactRepo;

    @Autowired
    private TokenUtil tokenUtil;

    @Autowired
    private AuthService authService;

    @Autowired
    private ImageService imageService;

    private Logger logger = LoggerFactory.getLogger(ContactServiceImpl.class);

    @Override
    public Contact createContact(ContactForm contact, HttpServletRequest request) {
        String contactId = UUID.randomUUID().toString();

        String userEmail = tokenUtil.getEmailFromJwt(request);

        User user = authService.getUserByEmail(userEmail).orElse(null);

//        logger.info("Photo information: {}", contact.getProfilePhoto().getOriginalFilename());
        String publicId = UUID.randomUUID().toString();

        String fileUrl = contact.getContactPhoto() == null || contact.getContactPhoto().isEmpty() ? "https://e7.pngegg.com/pngimages/442/17/png-clipart-computer-icons-user-profile-male-user-heroes-head-thumbnail.png" : imageService.uploadImage(contact.getContactPhoto(), publicId);

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
        newContact.setUser(user);
        newContact.setPicture(fileUrl);
        newContact.setCloudinaryImagePublicId(publicId);

        return contactRepo.save(newContact);
    }

    @Override
    public ResponseEntity<?> updateContact(String contactId, ContactForm newContact) {
        Optional<Contact> contact = contactRepo.findById(contactId);

        if(contact.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
        if(newContact.getContactPhoto() != null && !newContact.getContactPhoto().isEmpty()) {
            String newPublicId = UUID.randomUUID().toString();
            String cloudinaryId = contact.get().getCloudinaryImagePublicId();

            if(cloudinaryId != null && !cloudinaryId.isEmpty()) {
                imageService.deleteImage(cloudinaryId);
            }

            String fileUrl = imageService.uploadImage(newContact.getContactPhoto(), newPublicId);
            contact.get().setPicture(fileUrl);
            contact.get().setCloudinaryImagePublicId(newPublicId);
        }

        contact.get().setName(newContact.getName());
        contact.get().setEmail(newContact.getEmail());
        contact.get().setPhoneNumber(newContact.getPhone());
        contact.get().setAddress(newContact.getAddress());
        contact.get().setDescription(newContact.getDescription());
        contact.get().setWebsiteLink(newContact.getWebsite());
        contact.get().setLinkedinLink(newContact.getSocialLink());
        contact.get().setFavorite(newContact.getIsFavorite());

        contactRepo.save(contact.get());

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> deleteContact(String contactId) {
        Optional<Contact> contact = contactRepo.findById(contactId);

        if(contact.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        contactRepo.delete(contact.get());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
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
    public Page<Contact> searchByName(String name, int size, int page, String sortBy, String order) {
        Sort sort = order.equals("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);

        return contactRepo.findByNameContainingIgnoreCase(name, pageable);
    }

    @Override
    public Page<Contact> searchByEmail(String email, int size, int page, String sortBy, String order) {
        Sort sort = order.equals("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);

        return contactRepo.findByEmailContainingIgnoreCase(email, pageable);
    }

    @Override
    public Page<Contact> searchByPhone(String phone, int size, int page, String sortBy, String order) {
        Sort sort = order.equals("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);

        return contactRepo.findByPhoneNumberContaining(phone, pageable);
    }


    @Override
    public List<Contact> getByUserId(String userId) {
        return contactRepo.findByUserId(userId);
    }

    @Override
    public Page<Contact> getByUser(User user, int page, int size, String sortBy, String order) {
        Sort sort = order.equals("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();

        var pageable = PageRequest.of(page, size, sort);

        return contactRepo.findByUser(user, pageable);
    }

    @Override
    public Optional<Contact> getContactById(String contactId) {
        return contactRepo.findById(contactId);
    }
}
