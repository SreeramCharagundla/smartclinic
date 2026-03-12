package com.smartclinic.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record AiChatRequest(
        @NotBlank(message = "message is required") String message,
        @NotNull(message = "patientId is required") UUID patientId
) {
}
