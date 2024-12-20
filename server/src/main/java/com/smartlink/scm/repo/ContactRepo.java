package com.smartlink.scm.repo;

import com.smartlink.scm.model.Contact;
import com.smartlink.scm.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepo extends JpaRepository<Contact, String> {
    //finding contacts by user
    // custom finder method
    Page<Contact> findByUser(User user, Pageable pageable);

    // custom query method
    @Query("SELECT c from Contact c WHERE c.user.userId = :userId")
    List<Contact> findByUserId(@Param("userId") String userId);

    Page<Contact> findByNameContainingIgnoreCase(String name, Pageable pageable);

    Page<Contact> findByEmailContainingIgnoreCase(String email, Pageable pageable);

    Page<Contact> findByPhoneNumberContaining(String phoneNumber, Pageable pageable);
}
