package com.smartclinic.controller;

import com.smartclinic.dto.DoctorDto;
import com.smartclinic.security.AuthenticatedUser;
import com.smartclinic.service.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/doctors")
@RequiredArgsConstructor
public class DoctorController {

    private final DoctorService doctorService;

    @GetMapping("/me")
    public DoctorDto getCurrentDoctor(@AuthenticationPrincipal AuthenticatedUser authenticatedUser) {
        return doctorService.getCurrentDoctor(authenticatedUser);
    }

    @GetMapping("/{doctorId}")
    public DoctorDto getDoctor(@PathVariable UUID doctorId) {
        return doctorService.getDoctorById(doctorId);
    }
}
