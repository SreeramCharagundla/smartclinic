package com.smartclinic.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record VitalDto(
        LocalDateTime recordedAt,
        Integer heartRate,
        Integer systolicBp,
        Integer diastolicBp,
        BigDecimal temperature,
        BigDecimal oxygenSaturation,
        BigDecimal weight,
        BigDecimal height
) {
}
