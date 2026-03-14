package com.smartclinic.ai;

import com.smartclinic.dto.AppointmentDto;
import com.smartclinic.dto.AllergyDto;
import com.smartclinic.dto.ConditionDto;
import com.smartclinic.dto.LabResultDto;
import com.smartclinic.dto.PatientClinicalSummaryDto;
import com.smartclinic.dto.PatientProfileDto;
import com.smartclinic.dto.PrescriptionDto;
import com.smartclinic.dto.VaccinationDto;
import com.smartclinic.dto.VitalDto;
import com.smartclinic.dto.VisitNoteDto;
import com.smartclinic.service.AppointmentService;
import com.smartclinic.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.tool.annotation.Tool;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class AiPatientTools {

    private final PatientContextHolder patientContextHolder;
    private final PatientService patientService;
    private final AppointmentService appointmentService;

    @Tool(description = "Get the active patient's profile details")
    public PatientProfileDto getPatientProfile() {
        UUID patientId = patientContextHolder.getPatientIdOrThrow();
        return patientService.getPatientProfile(patientId);
    }

    @Tool(description = "Get the active patient's recent vitals")
    public List<VitalDto> getPatientVitals() {
        UUID patientId = patientContextHolder.getPatientIdOrThrow();
        return patientService.getPatientVitals(patientId);
    }

    @Tool(description = "Get the active patient's medications and prescriptions")
    public List<PrescriptionDto> getPatientMedications() {
        UUID patientId = patientContextHolder.getPatientIdOrThrow();
        return patientService.getPatientPrescriptions(patientId);
    }

    @Tool(description = "Get the active patient's upcoming appointments")
    public List<AppointmentDto> getUpcomingAppointments() {
        UUID patientId = patientContextHolder.getPatientIdOrThrow();
        return appointmentService.getUpcomingAppointmentsForPatient(patientId);
    }

    @Tool(description = "Get the patient's vaccination history")
    public List<VaccinationDto> getPatientVaccinations() {
        UUID patientId = patientContextHolder.getPatientIdOrThrow();
        return patientService.getPatientVaccinations(patientId);
    }

    @Tool(description = "Get the patient's most recent vital signs")
    public VitalDto getLatestVitals() {
        UUID patientId = patientContextHolder.getPatientIdOrThrow();
        return patientService.getLatestVitals(patientId);
    }

    @Tool(description = "Get the patient's allergy history including allergen, reaction, severity and recorded date")
    public List<AllergyDto> getPatientAllergies() {
        UUID patientId = patientContextHolder.getPatientIdOrThrow();
        return patientService.getPatientAllergies(patientId);
    }

    @Tool(description = "Get the patient's diagnosed medical conditions and status")
    public List<ConditionDto> getPatientConditions() {
        UUID patientId = patientContextHolder.getPatientIdOrThrow();
        return patientService.getPatientConditions(patientId);
    }

    @Tool(description = "Get the patient's laboratory test results with values, units and reference ranges")
    public List<LabResultDto> getPatientLabResults() {
        UUID patientId = patientContextHolder.getPatientIdOrThrow();
        return patientService.getPatientLabResults(patientId);
    }

    @Tool(description = "Get doctor's clinical notes recorded during patient visits")
    public List<VisitNoteDto> getPatientVisitNotes() {
        UUID patientId = patientContextHolder.getPatientIdOrThrow();
        return patientService.getPatientVisitNotes(patientId);
    }

    @Tool(description = "Get aggregated patient clinical summary including profile, vitals, medications, allergies, conditions, lab results, vaccines, visit notes, and upcoming appointments")
    public PatientClinicalSummaryDto getPatientClinicalSummary() {
        UUID patientId = patientContextHolder.getPatientIdOrThrow();
        return new PatientClinicalSummaryDto(
                patientId,
                patientService.getPatientProfile(patientId),
                patientService.getLatestVitals(patientId),
                patientService.getPatientVitals(patientId),
                patientService.getPatientPrescriptions(patientId),
                patientService.getPatientAllergies(patientId),
                patientService.getPatientConditions(patientId),
                patientService.getPatientLabResults(patientId),
                patientService.getPatientVaccinations(patientId),
                patientService.getPatientVisitNotes(patientId),
                appointmentService.getUpcomingAppointmentsForPatient(patientId)
        );
    }
}
