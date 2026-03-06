package com.smartclinic.service;

import com.smartclinic.dto.RegisterPatientRequest;
import com.smartclinic.entity.Patient;
import com.smartclinic.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;

    @Transactional
    public Patient createPatient(UUID userId, RegisterPatientRequest.PatientData data) {
        Patient patient = Patient.builder()
                .userId(userId)
                .firstName(data.getFirstName())
                .lastName(data.getLastName())
                .dob(parseDob(data.getDob()))
                .gender(data.getGender())
                .phone(data.getPhone())
                .address(data.getAddress())
                .bloodType(data.getBloodType())
                .build();
        return patientRepository.save(patient);
    }

    private static LocalDate parseDob(String dob) {
        return LocalDate.parse(dob);
    }
}
