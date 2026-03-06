package com.smartclinic.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterDoctorRequest {

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    @NotNull
    @Valid
    private DoctorData doctor;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DoctorData {
        @NotBlank(message = "First name is required")
        @JsonProperty("first_name")
        private String firstName;

        @NotBlank(message = "Last name is required")
        @JsonProperty("last_name")
        private String lastName;

        @NotBlank(message = "Specialty is required")
        @JsonProperty(value = "speciality", access = JsonProperty.Access.WRITE_ONLY)
        private String speciality; // frontend sends "speciality"

        @NotBlank(message = "License number is required")
        @JsonProperty("license_number")
        private String licenseNumber;

        @NotBlank(message = "Clinic address is required")
        @JsonProperty("clinic_address")
        private String clinicAddress;

        @NotBlank(message = "Phone is required")
        private String phone;
    }
}
