package com.smartclinic.dto;

import java.time.LocalDate;

public record PatientProfileDto(
        String firstName,
        String lastName,
        LocalDate dob,
        String gender,
        String phone,
        String address,
        String bloodType
) {
}
