package com.smartclinic.dto;

import java.time.LocalDate;
import java.util.UUID;

public record AllergyDto(
        UUID id,
        String allergen,
        String reaction,
        String severity,
        LocalDate recordedAt
) {
}
