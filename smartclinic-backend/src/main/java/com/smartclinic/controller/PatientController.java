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

    @GetMapping("/{patientId}/allergies")
    public List<AllergyDto> getAllergies(@PathVariable UUID patientId) {
        return patientService.getPatientAllergies(patientId);
    }

    @GetMapping("/{patientId}/conditions")
    public List<ConditionDto> getConditions(@PathVariable UUID patientId) {
        return patientService.getPatientConditions(patientId);
    }

    @GetMapping("/{patientId}/lab-results")
    public List<LabResultDto> getLabResults(@PathVariable UUID patientId) {
        return patientService.getPatientLabResults(patientId);
    }

    @GetMapping("/{patientId}/visit-notes")
    public List<VisitNoteDto> getVisitNotes(@PathVariable UUID patientId) {
        return patientService.getPatientVisitNotes(patientId);
    }
}
