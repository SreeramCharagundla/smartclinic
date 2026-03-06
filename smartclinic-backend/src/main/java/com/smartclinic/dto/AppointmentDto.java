package com.smartclinic.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record AppointmentDto(
        UUID appointmentId,
        UUID patientId,
        String patientName,
        LocalDateTime appointmentTime,
        String reason,
        String status
) {
}
