package com.smartclinic.service;

import com.smartclinic.dto.RegisterDoctorRequest;
import com.smartclinic.entity.Doctor;
import com.smartclinic.repository.DoctorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DoctorService {

    private final DoctorRepository doctorRepository;

    @Transactional
    public Doctor createDoctor(UUID userId, RegisterDoctorRequest.DoctorData data) {
        String specialty = data.getSpeciality() != null ? data.getSpeciality() : "";
        Doctor doctor = Doctor.builder()
                .userId(userId)
                .firstName(data.getFirstName())
                .lastName(data.getLastName())
                .specialty(specialty)
                .licenseNumber(data.getLicenseNumber())
                .clinicAddress(data.getClinicAddress())
                .phone(data.getPhone())
                .build();
        return doctorRepository.save(doctor);
    }
}
