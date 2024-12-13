package com.smartlink.scm.service;

import com.smartlink.scm.forms.ContactForm;
import com.smartlink.scm.model.Contact;
import com.smartlink.scm.model.User;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ContactService {
    Contact createContact(ContactForm contact, HttpServletRequest request);

    Contact updateContact(ContactForm contact);

    void deleteContact(String contactId);

    Contact getById(String contactId);

    List<Contact> getAll();

    Page<Contact> searchByName(String name, int size, int page, String sortBy, String order);

    Page<Contact> searchByEmail(String email, int size, int page, String sortBy, String order);

    Page<Contact> searchByPhone(String phone, int size, int page, String sortBy, String order);

    List<Contact> getByUserId(String userId);

    Page<Contact> getByUser(User user, int page, int size, String sortBy, String order);
}
