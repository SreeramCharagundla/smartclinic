package com.smartclinic.voice;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.BinaryMessage;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.BinaryWebSocketHandler;

@Component
public class VoiceAgentHandler extends BinaryWebSocketHandler {

    private static final Logger logger = LoggerFactory.getLogger(VoiceAgentHandler.class);
    private static final int PROCESSING_THRESHOLD_BYTES = 80 * 1024;

    private final ObjectMapper objectMapper;
    private final Map<String, SessionAudioBuffer> sessionBuffers = new ConcurrentHashMap<>();

    public VoiceAgentHandler(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessionBuffers.put(session.getId(), new SessionAudioBuffer());
        logger.info("Voice agent connected: sessionId={}, remoteAddress={}, acceptedProtocol={}",
                session.getId(), session.getRemoteAddress(), session.getAcceptedProtocol());
        sendJson(session, Map.of(
                "type", "status",
                "status", "LISTENING"
        ));
    }

    @Override
    protected void handleBinaryMessage(WebSocketSession session, BinaryMessage message) throws Exception {
        int payloadSize = message.getPayloadLength();
        SessionAudioBuffer buffer = sessionBuffers.computeIfAbsent(session.getId(), ignored -> new SessionAudioBuffer());

        synchronized (buffer) {
            buffer.append(message.getPayload().asReadOnlyBuffer());

            if (logger.isDebugEnabled()) {
                logger.debug("Received audio chunk: {} bytes, sessionId={}, bufferedBytes={}, isLast={}",
                        payloadSize, session.getId(), buffer.size(), message.isLast());
            }

            if (buffer.size() >= PROCESSING_THRESHOLD_BYTES) {
                int bufferedBytes = buffer.size();
                logger.info("Processing buffered audio: sessionId={}, bufferedBytes={}",
                        session.getId(), bufferedBytes);
                buffer.reset();
                simulateProcessing(session, bufferedBytes);
            }
        }
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) {
        String payload = message.getPayload();
        logger.info("Received voice text message: sessionId={}, payloadLength={}, payload={}",
                session.getId(), payload.length(), payload);

        String type = extractType(payload);
        if ("interrupt".equalsIgnoreCase(type)) {
            logger.info("Interrupt received: sessionId={}", session.getId());
            SessionAudioBuffer buffer = sessionBuffers.get(session.getId());
            if (buffer != null) {
                synchronized (buffer) {
                    buffer.reset();
                }
            }
            sendStatusSafely(session, "LISTENING");
            return;
        }

        sendStatusSafely(session, "LISTENING");
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        SessionAudioBuffer buffer = sessionBuffers.remove(session.getId());
        logger.info("Voice agent disconnected: sessionId={}, code={}, reason={}, wasFirstChunkReceived={}",
                session.getId(), status.getCode(), status.getReason(),
                buffer != null && buffer.hasAudio());
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        logger.warn("Voice agent transport error: sessionId={}, message={}",
                session.getId(), exception.getMessage(), exception);
        super.handleTransportError(session, exception);
    }

    private String extractType(String payload) {
        try {
            JsonNode root = objectMapper.readTree(payload);
            JsonNode typeNode = root.get("type");
            logger.debug("Parsed voice text payload: type={}", typeNode != null ? typeNode.asText() : null);
            return typeNode != null ? typeNode.asText() : "";
        } catch (IOException exception) {
            logger.debug("Voice text payload was not valid JSON: {}", payload);
            return "";
        }
    }

    private void sendJson(WebSocketSession session, Map<String, Object> payload) throws IOException {
        if (!session.isOpen()) {
            logger.warn("Skipping outbound voice event because session is closed: sessionId={}, payload={}",
                    session.getId(), payload);
            return;
        }

        String serialized = objectMapper.writeValueAsString(payload);
        logger.info("Sending voice event: sessionId={}, payload={}", session.getId(), serialized);
        session.sendMessage(new TextMessage(serialized));
    }

    private void sendStatusSafely(WebSocketSession session, String status) {
        try {
            sendJson(session, Map.of(
                    "type", "status",
                    "status", status
            ));
        } catch (IOException exception) {
            logger.warn("Failed to send voice status update: sessionId={}, status={}",
                    session.getId(), status, exception);
        }
    }

    private void simulateProcessing(WebSocketSession session, int bufferedBytes) throws IOException {
        sendJson(session, Map.of(
                "type", "status",
                "status", "TRANSCRIBING"
        ));
        sendJson(session, Map.of(
                "type", "status",
                "status", "AI_SPEAKING"
        ));
        sendJson(session, Map.of(
                "type", "transcript",
                "role", "assistant",
                "content", "Processed approximately " + bufferedBytes
                        + " bytes of streamed audio. SmartClinic voice buffering is working."
        ));
    }

    private static final class SessionAudioBuffer {
        private final ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        void append(java.nio.ByteBuffer payload) {
            byte[] bytes = new byte[payload.remaining()];
            payload.get(bytes);
            outputStream.writeBytes(bytes);
        }

        int size() {
            return outputStream.size();
        }

        boolean hasAudio() {
            return outputStream.size() > 0;
        }

        void reset() {
            outputStream.reset();
        }
    }
}
