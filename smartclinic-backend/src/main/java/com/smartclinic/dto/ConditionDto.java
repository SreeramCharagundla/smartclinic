package com.smartclinic.dto;

import java.time.LocalDate;
import java.util.UUID;

public record ConditionDto(
        UUID id,
        String conditionName,
        LocalDate diagnosedDate,
        String status,
        String notes
) {
}
