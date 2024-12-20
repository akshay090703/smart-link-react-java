package com.smartlink.scm.repo;

import com.smartlink.scm.model.OtpVerification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OtpRepo extends JpaRepository<OtpVerification, Long> {
    OtpVerification findByOwnerEmail(String ownerEmail);

    void deleteByOwnerEmail(String ownerEmail);
}
