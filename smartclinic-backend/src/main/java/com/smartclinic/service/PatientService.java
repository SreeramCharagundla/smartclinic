package com.smartclinic.service;

import com.smartclinic.dto.*;
import com.smartclinic.entity.Patient;
import com.smartclinic.entity.Prescription;
import com.smartclinic.entity.Vaccination;
import com.smartclinic.entity.Vital;
import com.smartclinic.exception.ResourceNotFoundException;
import com.smartclinic.repository.PatientRepository;
import com.smartclinic.repository.PrescriptionRepository;
import com.smartclinic.repository.VaccinationRepository;
import com.smartclinic.repository.VitalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;
    private final PrescriptionRepository prescriptionRepository;
    private final VitalRepository vitalRepository;
    private final VaccinationRepository vaccinationRepository;

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

    @Transactional(readOnly = true)
    public List<PatientSearchDto> searchPatients(String query) {
        return patientRepository.searchPatients(query).stream()
                .map(this::toPatientSearchDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public PatientProfileDto getPatientProfile(UUID patientId) {
        return patientRepository.findById(patientId)
                .map(this::toPatientProfileDto)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found: " + patientId));
    }

    @Transactional(readOnly = true)
    public List<PrescriptionDto> getPatientPrescriptions(UUID patientId) {
        ensurePatientExists(patientId);
        return prescriptionRepository.findByPatientId(patientId).stream()
                .map(this::toPrescriptionDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<VitalDto> getPatientVitals(UUID patientId) {
        ensurePatientExists(patientId);
        return vitalRepository.findByPatientIdOrderByRecordedAtDesc(patientId).stream()
                .map(this::toVitalDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<VaccinationDto> getPatientVaccinations(UUID patientId) {
        ensurePatientExists(patientId);
        return vaccinationRepository.findByPatientIdOrderByAdministeredDateDesc(patientId).stream()
                .map(this::toVaccinationDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public VitalDto getLatestVitals(UUID patientId) {
        ensurePatientExists(patientId);
        return vitalRepository.findTopByPatientIdOrderByRecordedAtDesc(patientId)
                .map(this::toVitalDto)
                .orElse(null);
    }

    private void ensurePatientExists(UUID patientId) {
        if (!patientRepository.existsById(patientId)) {
            throw new ResourceNotFoundException("Patient not found: " + patientId);
        }
    }

    private PatientSearchDto toPatientSearchDto(Patient patient) {
        return new PatientSearchDto(patient.getId(), patient.getFirstName(), patient.getLastName());
    }

    private PatientProfileDto toPatientProfileDto(Patient patient) {
        return new PatientProfileDto(
                patient.getFirstName(),
                patient.getLastName(),
                patient.getDob(),
                patient.getGender(),
                patient.getPhone(),
                patient.getAddress(),
                patient.getBloodType()
        );
    }

    private PrescriptionDto toPrescriptionDto(Prescription prescription) {
        String doctorName = prescription.getDoctor().getFirstName() + " " + prescription.getDoctor().getLastName();
        return new PrescriptionDto(
                prescription.getMedication().getName(),
                prescription.getDosage(),
                prescription.getFrequency(),
                prescription.getStartDate(),
                prescription.getEndDate(),
                prescription.getInstructions(),
                doctorName
        );
    }

    private VitalDto toVitalDto(Vital vital) {
        return new VitalDto(
                vital.getRecordedAt(),
                vital.getHeartRate(),
                vital.getSystolicBp(),
                vital.getDiastolicBp(),
                vital.getTemperature(),
                vital.getOxygenSaturation(),
                vital.getWeight(),
                vital.getHeight()
        );
    }

    private VaccinationDto toVaccinationDto(Vaccination vaccination) {
        return new VaccinationDto(
                vaccination.getVaccineName(),
                vaccination.getDoseNumber(),
                vaccination.getAdministeredDate(),
                vaccination.getProvider()
        );
    }

    private static LocalDate parseDob(String dob) {
        return LocalDate.parse(dob);
    }
}
