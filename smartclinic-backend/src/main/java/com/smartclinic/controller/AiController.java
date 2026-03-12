package com.smartclinic.controller;

import com.smartclinic.dto.AiChatRequest;
import com.smartclinic.dto.AiChatResponse;
import com.smartclinic.service.AiAgentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiController {

    private final AiAgentService aiAgentService;

    @PostMapping("/chat")
    public AiChatResponse chat(@Valid @RequestBody AiChatRequest request) {
        String response = aiAgentService.processMessage(request.message(), request.patientId());
        return new AiChatResponse(response);
    }
}
