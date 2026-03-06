package com.smartclinic.service;

import com.smartclinic.dto.AppointmentDto;
import com.smartclinic.entity.Appointment;
import com.smartclinic.repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;

    @Transactional(readOnly = true)
    public List<AppointmentDto> getTodaysAppointments(UUID doctorId) {
        LocalDate today = LocalDate.now();
        LocalDateTime startOfDay = today.atStartOfDay();
        LocalDateTime endOfDay = today.plusDays(1).atStartOfDay();

        return appointmentRepository
                .findByDoctorIdAndAppointmentTimeBetweenOrderByAppointmentTime(doctorId, startOfDay, endOfDay)
                .stream()
                .map(this::toDto)
                .toList();
    }

    private AppointmentDto toDto(Appointment appointment) {
        return new AppointmentDto(
                appointment.getId(),
                appointment.getPatient().getId(),
                appointment.getPatient().getFirstName() + " " + appointment.getPatient().getLastName(),
                appointment.getAppointmentTime(),
                appointment.getReason(),
                appointment.getStatus()
        );
    }
}
