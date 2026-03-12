package com.smartclinic.ai;

import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class PatientContextHolder {

    private final ThreadLocal<UUID> patientContext = new ThreadLocal<>();

    public UUID getPatientIdOrThrow() {
        UUID patientId = patientContext.get();
        if (patientId == null) {
            throw new IllegalStateException("No patient context available for tool call");
        }
        return patientId;
    }

    public <T> T withPatientContext(UUID patientId, ContextualSupplier<T> supplier) {
        patientContext.set(patientId);
        try {
            return supplier.get();
        } finally {
            patientContext.remove();
        }
    }

    @FunctionalInterface
    public interface ContextualSupplier<T> {
        T get();
    }
}
