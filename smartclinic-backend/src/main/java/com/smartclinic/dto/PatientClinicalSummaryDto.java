package com.smartclinic.dto;

import java.util.List;
import java.util.UUID;

public record PatientClinicalSummaryDto(
        UUID patientId,
        PatientProfileDto profile,
        VitalDto latestVitals,
        List<VitalDto> vitals,
        List<PrescriptionDto> medications,
        List<AllergyDto> allergies,
        List<ConditionDto> conditions,
        List<LabResultDto> labResults,
        List<VaccinationDto> vaccinations,
        List<VisitNoteDto> visitNotes,
        List<AppointmentDto> upcomingAppointments
) {
}
