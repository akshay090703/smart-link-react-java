package com.smartlink.scm.service;

import com.smartlink.scm.forms.ContactForm;
import com.smartlink.scm.model.Contact;
import com.smartlink.scm.model.User;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface ContactService {
    Contact createContact(ContactForm contact, HttpServletRequest request);

    public ResponseEntity<?> updateContact(String contactId, ContactForm newContact);

    ResponseEntity<?> deleteContact(String contactId);

    Contact getById(String contactId);

    List<Contact> getAll();

    Page<Contact> searchByName(String name, int size, int page, String sortBy, String order);

    Page<Contact> searchByEmail(String email, int size, int page, String sortBy, String order);

    Page<Contact> searchByPhone(String phone, int size, int page, String sortBy, String order);

    List<Contact> getByUserId(String userId);

    Page<Contact> getByUser(User user, int page, int size, String sortBy, String order);

    Optional<Contact> getContactById(String contactId);
}
