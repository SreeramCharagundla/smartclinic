package com.smartclinic.repository;

import com.smartclinic.entity.Vital;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface VitalRepository extends JpaRepository<Vital, UUID> {

    List<Vital> findByPatientIdOrderByRecordedAtDesc(UUID patientId);
}
