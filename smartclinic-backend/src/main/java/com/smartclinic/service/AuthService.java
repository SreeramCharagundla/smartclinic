package com.smartclinic.service;

import com.smartclinic.dto.AuthResponse;
import com.smartclinic.dto.LoginRequest;
import com.smartclinic.dto.RegisterDoctorRequest;
import com.smartclinic.dto.RegisterPatientRequest;
import com.smartclinic.entity.User;
import com.smartclinic.exception.InvalidCredentialsException;
import com.smartclinic.exception.UserAlreadyExistsException;
import com.smartclinic.repository.UserRepository;
import com.smartclinic.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private UserRepository userRepository;
    private PatientService patientService;
    private DoctorService doctorService;
    private PasswordEncoder passwordEncoder;
    private JwtService jwtService;

    @Transactional
    public AuthResponse registerPatient(RegisterPatientRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new UserAlreadyExistsException("A user with this email already exists");
        }
        String hashedPassword = passwordEncoder.encode(request.getPassword());
        User user = User.builder()
                .email(request.getEmail())
                .passwordHash(hashedPassword)
                .role("PATIENT")
                .build();
        user = userRepository.save(user);
        patientService.createPatient(user.getId(), request.getPatient());
        String token = jwtService.generateToken(user.getEmail(), user.getRole(), user.getId());
        return buildAuthResponse(token, user);
    }

    @Transactional
    public AuthResponse registerDoctor(RegisterDoctorRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new UserAlreadyExistsException("A user with this email already exists");
        }
        String hashedPassword = passwordEncoder.encode(request.getPassword());
        User user = User.builder()
                .email(request.getEmail())
                .passwordHash(hashedPassword)
                .role("DOCTOR")
                .build();
        user = userRepository.save(user);
        doctorService.createDoctor(user.getId(), request.getDoctor());
        String token = jwtService.generateToken(user.getEmail(), user.getRole(), user.getId());
        return buildAuthResponse(token, user);
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new InvalidCredentialsException("Invalid email or password"));
        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new InvalidCredentialsException("Invalid email or password");
        }
        String token = jwtService.generateToken(user.getEmail(), user.getRole(), user.getId());
        return buildAuthResponse(token, user);
    }

    private AuthResponse buildAuthResponse(String token, User user) {
        String roleLower = user.getRole().toLowerCase();
        AuthResponse.UserInfo userInfo = new AuthResponse.UserInfo(user.getEmail(), roleLower);
        return AuthResponse.builder()
                .token(token)
                .user(userInfo)
                .build();
    }
}
