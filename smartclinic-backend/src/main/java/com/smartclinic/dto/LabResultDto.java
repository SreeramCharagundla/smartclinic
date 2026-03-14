package com.smartclinic.dto;

import java.time.LocalDate;
import java.util.UUID;

public record LabResultDto(
        UUID id,
        String testName,
        String resultValue,
        String unit,
        String referenceRange,
        LocalDate resultDate
) {
}
