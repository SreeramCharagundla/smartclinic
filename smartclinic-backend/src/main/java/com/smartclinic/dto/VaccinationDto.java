package com.smartclinic.dto;

import java.time.LocalDate;

public record VaccinationDto(
        String vaccineName,
        Integer doseNumber,
        LocalDate administeredDate,
        String provider
) {
}
