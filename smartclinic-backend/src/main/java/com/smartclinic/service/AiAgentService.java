package com.smartclinic.service;

import com.smartclinic.ai.AiPatientTools;
import com.smartclinic.ai.PatientContextHolder;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AiAgentService {

    private final ChatClient.Builder chatClientBuilder;
    private final PatientContextHolder patientContextHolder;
    private final AiPatientTools aiPatientTools;

    public String processMessage(String message, UUID patientId) {
        return patientContextHolder.withPatientContext(patientId, () -> {
            ChatClient chatClient = chatClientBuilder.build();

            String response = chatClient
                    .prompt()
                    .system(systemPrompt(patientId))
                    .user(message)
                    .tools(aiPatientTools)
                    .call()
                    .content();

            return response != null ? response : "I could not generate a response.";
        });
    }

    private String systemPrompt(UUID patientId) {
        return """
                You are SmartClinic's clinical assistant helping doctors analyze patient data.
                The doctor is currently viewing patient %s.
                When the doctor asks about this patient, use your available tools to retrieve source data first,
                then provide a concise clinical summary in natural language.
                Never ask the doctor to type a patient ID.
                """.formatted(patientId);
    }
}
