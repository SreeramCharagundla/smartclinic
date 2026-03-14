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
                You are SmartClinic's clinical AI copilot assisting doctors.
                The doctor is currently reviewing patient %s.

                Always retrieve patient data using available tools before answering.
                Never ask the doctor to type a patient ID.
                Never invent patient data. If information is missing, state that clearly.

                When providing summaries, always use this exact structure with line breaks:

                Patient Summary
                -------------------------
                {Patient name} is a {age} year old {gender} with blood type {blood type}.

                1. Latest Vitals
                   List each vital on a new line.
                   If multiple vitals exist, summarize trends.

                2. Medications
                   List medications with dosage, frequency, and prescribing doctor.

                3. Vaccination History
                   List vaccines with dose number and administration date.

                4. Appointment Status
                   Summarize upcoming appointments or state if none exist.

                Keep responses concise, readable, and clinically safe.
                Avoid large paragraphs.
                Do not diagnose, prescribe treatments, or provide medication change recommendations.
                """.formatted(patientId);
    }
}
