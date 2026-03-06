package com.smartclinic.repository;

import com.smartclinic.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface PatientRepository extends JpaRepository<Patient, UUID> {

    Optional<Patient> findByUserId(UUID userId);

    @Query("""
            SELECT p FROM Patient p
            WHERE LOWER(p.firstName) LIKE LOWER(CONCAT('%', :query, '%'))
               OR LOWER(p.lastName) LIKE LOWER(CONCAT('%', :query, '%'))
            ORDER BY p.firstName, p.lastName
            """)
    List<Patient> searchPatients(String query);
}
