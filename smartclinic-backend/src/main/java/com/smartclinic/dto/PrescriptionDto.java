package com.smartclinic.dto;

import java.time.LocalDate;

public record PrescriptionDto(
        String medication,
        String dosage,
        String frequency,
        LocalDate startDate,
        LocalDate endDate,
        String instructions,
        String doctorName
) {
}
