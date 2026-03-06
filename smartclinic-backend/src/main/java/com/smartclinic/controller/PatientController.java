package com.smartclinic.controller;

import com.smartclinic.dto.*;
import com.smartclinic.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/patients")
@RequiredArgsConstructor
public class PatientController {

    private final PatientService patientService;

    @GetMapping("/search")
    public List<PatientSearchDto> searchPatients(@RequestParam String query) {
        return patientService.searchPatients(query);
    }

    @GetMapping("/{patientId}")
    public PatientProfileDto getPatient(@PathVariable UUID patientId) {
        return patientService.getPatientProfile(patientId);
    }

    @GetMapping("/{patientId}/prescriptions")
    public List<PrescriptionDto> getPrescriptions(@PathVariable UUID patientId) {
        return patientService.getPatientPrescriptions(patientId);
    }

    @GetMapping("/{patientId}/vitals")
    public List<VitalDto> getVitals(@PathVariable UUID patientId) {
        return patientService.getPatientVitals(patientId);
    }

    @GetMapping("/{patientId}/vaccinations")
    public List<VaccinationDto> getVaccinations(@PathVariable UUID patientId) {
        return patientService.getPatientVaccinations(patientId);
    }
}
