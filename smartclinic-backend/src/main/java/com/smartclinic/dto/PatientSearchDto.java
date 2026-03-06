package com.smartclinic.dto;

import java.util.UUID;

public record PatientSearchDto(
        UUID id,
        String firstName,
        String lastName
) {
}
