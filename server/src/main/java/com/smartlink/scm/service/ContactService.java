package com.smartlink.scm.service;

import com.smartlink.scm.forms.ContactForm;
import com.smartlink.scm.model.Contact;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface ContactService {
    Contact createContact(ContactForm contact, HttpServletRequest request);

    Contact updateContact(ContactForm contact);

    void deleteContact(String contactId);

    Contact getById(String contactId);

    List<Contact> getAll();

    List<Contact> searchContact(String name, String email, String phoneNumber);

    List<Contact> getByUserId(String userId);
}
