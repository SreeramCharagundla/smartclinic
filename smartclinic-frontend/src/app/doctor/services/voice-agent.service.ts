import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ChatMessage } from '../models/chat-message';

export type VoiceStatus =
  | 'IDLE'
  | 'LISTENING'
  | 'TRANSCRIBING'
  | 'AI_SPEAKING';

interface VoiceTranscriptEvent {
  message: ChatMessage;
}

interface VoiceSocketMessage {
  type?: string;
  status?: VoiceStatus | string;
  role?: 'user' | 'assistant' | 'doctor' | 'ai';
  content?: string;
  text?: string;
  transcript?: string;
  message?: string;
}

@Injectable({ providedIn: 'root' })
export class VoiceAgentService implements OnDestroy {
  private readonly socketUrl = 'ws://localhost:8080/voice-agent';
  private readonly statusSubject = new BehaviorSubject<VoiceStatus>('IDLE');
  private readonly transcriptSubject = new Subject<VoiceTranscriptEvent>();

  readonly status$: Observable<VoiceStatus> = this.statusSubject.asObservable();
  readonly transcript$: Observable<VoiceTranscriptEvent> =
    this.transcriptSubject.asObservable();

  private socket?: WebSocket;
  private mediaRecorder?: MediaRecorder;
  private mediaStream?: MediaStream;
  private connectPromise?: Promise<WebSocket>;

  async startListening(): Promise<void> {
    await this.ensureSocket();

    if (!navigator.mediaDevices?.getUserMedia) {
      throw new Error('Microphone access is not supported in this browser.');
    }

    if (!this.mediaStream) {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    }

    if (this.mediaRecorder?.state === 'recording') {
      this.statusSubject.next('LISTENING');
      return;
    }

    const mimeType = this.getSupportedMimeType();
    this.mediaRecorder = mimeType
      ? new MediaRecorder(this.mediaStream, { mimeType })
      : new MediaRecorder(this.mediaStream);

    this.mediaRecorder.addEventListener('dataavailable', this.handleDataAvailable);
    this.mediaRecorder.addEventListener('stop', this.handleRecordingStop);
    this.mediaRecorder.start(250);
    this.statusSubject.next('LISTENING');
  }

  stopListening(): void {
    if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') {
      if (this.statusSubject.value === 'LISTENING') {
        this.statusSubject.next('TRANSCRIBING');
      }
      return;
    }

    this.mediaRecorder.stop();
    this.statusSubject.next('TRANSCRIBING');
  }

  async interrupt(): Promise<void> {
    const socket = await this.ensureSocket();
    socket.send(JSON.stringify({ type: 'interrupt' }));
    this.statusSubject.next('LISTENING');
  }

  disconnect(): void {
    this.stopRecorder();
    this.stopStream();

    if (this.socket && this.socket.readyState <= WebSocket.OPEN) {
      this.socket.close();
    }

    this.socket = undefined;
    this.connectPromise = undefined;
    this.statusSubject.next('IDLE');
  }

  ngOnDestroy(): void {
    this.disconnect();
    this.statusSubject.complete();
    this.transcriptSubject.complete();
  }

  private async ensureSocket(): Promise<WebSocket> {
    if (this.socket?.readyState === WebSocket.OPEN) {
      return this.socket;
    }

    if (this.connectPromise) {
      return this.connectPromise;
    }

    this.connectPromise = new Promise<WebSocket>((resolve, reject) => {
      const socket = new WebSocket(this.socketUrl);
      socket.binaryType = 'arraybuffer';

      socket.onopen = () => {
        this.socket = socket;
        this.connectPromise = undefined;
        resolve(socket);
      };

      socket.onmessage = (event) => this.handleSocketMessage(event.data);
      socket.onerror = () => {
        this.connectPromise = undefined;
        reject(new Error('Voice WebSocket connection failed.'));
      };
      socket.onclose = () => {
        this.socket = undefined;
        this.connectPromise = undefined;
        if (this.statusSubject.value !== 'IDLE') {
          this.statusSubject.next('IDLE');
        }
      };
    });

    return this.connectPromise;
  }

  private async handleDataAvailable(event: BlobEvent): Promise<void> {
    if (!event.data.size || !this.socket || this.socket.readyState !== WebSocket.OPEN) {
      return;
    }

    const chunk = await event.data.arrayBuffer();
    this.socket.send(chunk);
  }

  private handleRecordingStop = (): void => {
    this.cleanupRecorder();
  };

  private handleSocketMessage(rawData: string | ArrayBuffer): void {
    if (typeof rawData !== 'string') {
      return;
    }

    let payload: VoiceSocketMessage;
    try {
      payload = JSON.parse(rawData) as VoiceSocketMessage;
    } catch {
      return;
    }

    const nextStatus = this.extractStatus(payload);
    if (nextStatus) {
      this.statusSubject.next(nextStatus);
    }

    const transcriptEvent = this.extractTranscript(payload);
    if (transcriptEvent) {
      this.transcriptSubject.next(transcriptEvent);
    }
  }

  private extractStatus(payload: VoiceSocketMessage): VoiceStatus | null {
    const rawStatus = payload.status ?? payload.type;
    if (!rawStatus) {
      return null;
    }

    const normalized = rawStatus.toUpperCase();
    if (
      normalized === 'IDLE' ||
      normalized === 'LISTENING' ||
      normalized === 'TRANSCRIBING' ||
      normalized === 'AI_SPEAKING'
    ) {
      return normalized;
    }

    if (normalized.includes('LISTEN')) {
      return 'LISTENING';
    }
    if (normalized.includes('TRANSCRIB')) {
      return 'TRANSCRIBING';
    }
    if (normalized.includes('SPEAK')) {
      return 'AI_SPEAKING';
    }

    return null;
  }

  private extractTranscript(
    payload: VoiceSocketMessage,
  ): VoiceTranscriptEvent | null {
    const text =
      payload.content ?? payload.transcript ?? payload.text ?? payload.message;
    if (!text) {
      return null;
    }

    const normalizedRole = (payload.role ?? payload.type ?? '').toLowerCase();
    const role: ChatMessage['role'] =
      normalizedRole === 'user' || normalizedRole === 'doctor'
        ? 'user'
        : 'assistant';

    return {
      message: {
        role,
        content: text,
      },
    };
  }

  private getSupportedMimeType(): string | undefined {
    const candidates = [
      'audio/webm;codecs=opus',
      'audio/webm',
      'audio/mp4',
      'audio/ogg;codecs=opus',
    ];

    return candidates.find((type) => MediaRecorder.isTypeSupported(type));
  }

  private stopRecorder(): void {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    } else {
      this.cleanupRecorder();
    }
  }

  private cleanupRecorder(): void {
    if (this.mediaRecorder) {
      this.mediaRecorder.removeEventListener(
        'dataavailable',
        this.handleDataAvailable,
      );
      this.mediaRecorder.removeEventListener('stop', this.handleRecordingStop);
    }

    this.mediaRecorder = undefined;
  }

  private stopStream(): void {
    this.mediaStream?.getTracks().forEach((track) => track.stop());
    this.mediaStream = undefined;
  }
}
