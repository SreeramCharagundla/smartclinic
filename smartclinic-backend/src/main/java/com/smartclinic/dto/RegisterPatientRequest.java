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
public class RegisterPatientRequest {

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    @NotNull
    @Valid
    private PatientData patient;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PatientData {
        @NotBlank(message = "First name is required")
        @JsonProperty("first_name")
        private String firstName;

        @NotBlank(message = "Last name is required")
        @JsonProperty("last_name")
        private String lastName;

        @NotBlank(message = "Date of birth is required")
        private String dob;

        @NotBlank(message = "Gender is required")
        private String gender;

        @NotBlank(message = "Phone is required")
        private String phone;

        @NotBlank(message = "Address is required")
        private String address;

        @NotBlank(message = "Blood type is required")
        @JsonProperty("blood_type")
        private String bloodType;
    }
}
