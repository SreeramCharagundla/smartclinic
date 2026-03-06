package com.smartclinic.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "vitals")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Vital {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "recorded_at", nullable = false)
    private LocalDateTime recordedAt;

    @Column(name = "heart_rate", nullable = false)
    private Integer heartRate;

    @Column(name = "systolic_bp", nullable = false)
    private Integer systolicBp;

    @Column(name = "diastolic_bp", nullable = false)
    private Integer diastolicBp;

    @Column(nullable = false)
    private BigDecimal temperature;

    @Column(name = "oxygen_saturation", nullable = false)
    private BigDecimal oxygenSaturation;

    @Column(nullable = false)
    private BigDecimal weight;

    @Column(nullable = false)
    private BigDecimal height;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;
}
