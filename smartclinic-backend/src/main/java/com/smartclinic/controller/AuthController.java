package com.smartclinic.controller;

import com.smartclinic.dto.AuthResponse;
import com.smartclinic.dto.LoginRequest;
import com.smartclinic.dto.RegisterDoctorRequest;
import com.smartclinic.dto.RegisterPatientRequest;
import com.smartclinic.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register/patient")
    @ResponseStatus(HttpStatus.CREATED)
    public AuthResponse registerPatient(@Valid @RequestBody RegisterPatientRequest request) {
        return authService.registerPatient(request);
    }

    @PostMapping("/register/doctor")
    @ResponseStatus(HttpStatus.CREATED)
    public AuthResponse registerDoctor(@Valid @RequestBody RegisterDoctorRequest request) {
        return authService.registerDoctor(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }
}
