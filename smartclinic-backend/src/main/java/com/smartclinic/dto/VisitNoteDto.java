package com.smartclinic.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record VisitNoteDto(
        UUID id,
        UUID doctorId,
        String note,
        LocalDateTime createdAt
) {
}
