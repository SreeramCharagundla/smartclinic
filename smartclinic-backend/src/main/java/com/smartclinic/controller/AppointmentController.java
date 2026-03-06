package com.smartclinic.controller;

import com.smartclinic.dto.AppointmentDto;
import com.smartclinic.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/doctors/{doctorId}/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    @GetMapping("/today")
    public List<AppointmentDto> getTodaysAppointments(@PathVariable UUID doctorId) {
        return appointmentService.getTodaysAppointments(doctorId);
    }
}
