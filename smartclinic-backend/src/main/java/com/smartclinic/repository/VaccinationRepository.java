package com.smartclinic.repository;

import com.smartclinic.entity.Vaccination;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface VaccinationRepository extends JpaRepository<Vaccination, UUID> {

    List<Vaccination> findByPatientId(UUID patientId);
}
