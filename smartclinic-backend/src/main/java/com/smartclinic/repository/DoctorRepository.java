package com.smartclinic.repository;

import com.smartclinic.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.UUID;

public interface DoctorRepository extends JpaRepository<Doctor, UUID> {

    Optional<Doctor> findByUserId(UUID userId);

    @Query("SELECT d FROM Doctor d JOIN d.user u WHERE LOWER(u.email) = LOWER(:email)")
    Optional<Doctor> findByUserEmail(String email);
}
