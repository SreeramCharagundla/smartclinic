package com.smartclinic.service;

import com.smartclinic.dto.DoctorDto;
import com.smartclinic.dto.RegisterDoctorRequest;
import com.smartclinic.entity.Doctor;
import com.smartclinic.exception.ResourceNotFoundException;
import com.smartclinic.repository.DoctorRepository;
import com.smartclinic.security.AuthenticatedUser;
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

    @Transactional(readOnly = true)
    public DoctorDto getCurrentDoctor(AuthenticatedUser authenticatedUser) {
        return doctorRepository.findByUserEmail(authenticatedUser.getEmail())
                .map(this::toDoctorDto)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor profile not found for current user"));
    }

    @Transactional(readOnly = true)
    public DoctorDto getDoctorById(UUID doctorId) {
        return doctorRepository.findById(doctorId)
                .map(this::toDoctorDto)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found: " + doctorId));
    }

    private DoctorDto toDoctorDto(Doctor doctor) {
        return new DoctorDto(
                doctor.getId(),
                doctor.getFirstName(),
                doctor.getLastName(),
                doctor.getSpecialty(),
                doctor.getLicenseNumber(),
                doctor.getClinicAddress(),
                doctor.getPhone()
        );
    }
}
