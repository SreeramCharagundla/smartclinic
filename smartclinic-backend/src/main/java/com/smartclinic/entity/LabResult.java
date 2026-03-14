package com.smartclinic.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "lab_results")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LabResult {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "test_name", nullable = false)
    private String testName;

    @Column(name = "result_value", nullable = false)
    private String resultValue;

    @Column(nullable = false)
    private String unit;

    @Column(name = "reference_range", nullable = false)
    private String referenceRange;

    @Column(name = "result_date", nullable = false)
    private LocalDate resultDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;
}
