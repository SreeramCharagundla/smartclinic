package com.smartclinic.ai;

import com.smartclinic.dto.AppointmentDto;
import com.smartclinic.dto.PatientProfileDto;
import com.smartclinic.dto.PrescriptionDto;
import com.smartclinic.dto.VaccinationDto;
import com.smartclinic.dto.VitalDto;
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
}
