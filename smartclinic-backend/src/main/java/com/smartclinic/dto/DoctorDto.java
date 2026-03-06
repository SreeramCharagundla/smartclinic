package com.smartclinic.dto;

import java.util.UUID;

public record DoctorDto(
        UUID id,
        String firstName,
        String lastName,
        String specialty,
        String licenseNumber,
        String clinicAddress,
        String phone
) {
}
