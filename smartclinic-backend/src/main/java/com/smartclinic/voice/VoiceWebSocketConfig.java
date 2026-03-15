package com.smartclinic.voice;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class VoiceWebSocketConfig implements WebSocketConfigurer {

    private final VoiceAgentHandler voiceAgentHandler;

    @Value("${cors.allowed-origins:http://localhost:4200}")
    private String allowedOrigins;

    public VoiceWebSocketConfig(VoiceAgentHandler voiceAgentHandler) {
        this.voiceAgentHandler = voiceAgentHandler;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(voiceAgentHandler, "/voice-agent")
                .setAllowedOrigins(allowedOrigins.split(","));
    }
}
