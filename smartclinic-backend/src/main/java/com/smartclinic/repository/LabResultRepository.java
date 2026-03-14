package com.smartclinic.repository;

import com.smartclinic.entity.LabResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface LabResultRepository extends JpaRepository<LabResult, UUID> {

    List<LabResult> findByPatientIdOrderByResultDateDesc(UUID patientId);
}
