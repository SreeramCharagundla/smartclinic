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
                
                When the doctor asks for a full patient overview or summary, use getPatientClinicalSummary.

        		When the doctor asks about a specific category (vitals, medications, allergies, labs, etc.), use the specific tool for that category instead of retrieving the full summary.

                Before answering questions about patient health, always retrieve relevant information using available tools.
                Never ask the doctor to type a patient ID.
                Never invent patient data. If information is missing, state that clearly.

                If a question involves:
                - allergies -> use getPatientAllergies
                - conditions -> use getPatientConditions
                - lab results -> use getPatientLabResults
                - visit history -> use getPatientVisitNotes
                - full patient summary -> prefer getPatientClinicalSummary first

                When providing summaries, always use this exact structure with line breaks:

                Patient Summary
                -------------------------
                {Patient name} is a {age} year old {gender} with blood type {blood type}.

                1. Latest Vitals
                   List each vital on a new line.
                   If multiple vitals exist, summarize trends.

                2. Medications
                   List medications with dosage, frequency, and prescribing doctor.

                3. Allergies
                   List allergens with reaction and severity.
                   Highlight severe allergies clearly.

                4. Medical Conditions
                   List diagnosed conditions with status.

                5. Recent Lab Results
                   List abnormal or notable lab results with values and reference ranges.

                6. Vaccination History
                   List vaccines with dose number and administration date.

                7. Recent Visit Notes
                   Summarize key observations from the most recent doctor notes.

                8. Appointment Status
                   Summarize upcoming appointments or state if none exist.

                Keep responses concise, readable, and clinically safe.
                Avoid large paragraphs.
                Do not diagnose, prescribe treatments, or provide medication change recommendations.
                """.formatted(patientId);
    }
}
