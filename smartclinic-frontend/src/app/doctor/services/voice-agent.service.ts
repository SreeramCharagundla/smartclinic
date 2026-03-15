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
    console.debug('[VoiceAgent] startListening requested');

    try {
      const mediaStream = await this.ensureMediaStream();

      if (this.mediaRecorder?.state === 'recording') {
        console.debug('[VoiceAgent] MediaRecorder already recording');
        this.statusSubject.next('LISTENING');
        return;
      }

      const socket = await this.ensureSocket();
      console.debug('[VoiceAgent] WebSocket ready for microphone streaming', {
        readyState: socket.readyState,
      });

      const mimeType = this.getSupportedMimeType();
      this.mediaRecorder = mimeType
        ? new MediaRecorder(mediaStream, { mimeType })
        : new MediaRecorder(mediaStream);
      console.debug('[VoiceAgent] MediaRecorder created', {
        mimeType: this.mediaRecorder.mimeType || mimeType || 'default',
        streamActive: mediaStream.active,
      });

      this.mediaRecorder.addEventListener('dataavailable', this.handleDataAvailable);
      this.mediaRecorder.addEventListener('stop', this.handleRecordingStop);
      this.mediaRecorder.start(250);
      console.debug('[VoiceAgent] MediaRecorder started with timeslice', {
        timesliceMs: 250,
        state: this.mediaRecorder.state,
      });
      this.statusSubject.next('LISTENING');
    } catch (error) {
      console.error('[VoiceAgent] Failed to start listening', error);
      this.disconnect();
      throw error;
    }
  }

  stopListening(): void {
    console.debug('[VoiceAgent] stopListening requested', {
      recorderState: this.mediaRecorder?.state ?? 'missing',
    });
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
    console.debug('[VoiceAgent] Sending interrupt event');
    socket.send(JSON.stringify({ type: 'interrupt' }));
    this.statusSubject.next('LISTENING');
  }

  disconnect(): void {
    console.debug('[VoiceAgent] Disconnect requested');
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
        console.debug('[VoiceAgent] WebSocket connected', {
          url: this.socketUrl,
          readyState: socket.readyState,
        });
        resolve(socket);
      };

      socket.onmessage = (event) => this.handleSocketMessage(event.data);
      socket.onerror = () => {
        this.connectPromise = undefined;
        console.error('[VoiceAgent] WebSocket error', {
          url: this.socketUrl,
          readyState: socket.readyState,
        });
        reject(new Error('Voice WebSocket connection failed.'));
      };
      socket.onclose = (event) => {
        console.warn('[VoiceAgent] WebSocket closed', {
          url: this.socketUrl,
          readyState: socket.readyState,
          code: event.code,
          reason: event.reason,
          wasClean: event.wasClean,
        });
        this.socket = undefined;
        this.connectPromise = undefined;
        if (this.statusSubject.value !== 'IDLE') {
          this.statusSubject.next('IDLE');
        }
      };
    });

    return this.connectPromise;
  }

  private async ensureMediaStream(): Promise<MediaStream> {
    if (!navigator.mediaDevices?.getUserMedia) {
      throw new Error('Microphone access is not supported in this browser.');
    }

    if (this.mediaStream) {
      console.debug('[VoiceAgent] Reusing existing microphone stream', {
        tracks: this.mediaStream.getAudioTracks().length,
        active: this.mediaStream.active,
      });
      return this.mediaStream;
    }

    console.debug('[VoiceAgent] Requesting microphone access');
    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.debug('[VoiceAgent] Microphone stream acquired', {
        tracks: this.mediaStream.getAudioTracks().length,
        active: this.mediaStream.active,
      });
      return this.mediaStream;
    } catch (error) {
      console.error('[VoiceAgent] getUserMedia failed', error);
      throw error;
    }
  }

  private handleDataAvailable = async (event: BlobEvent): Promise<void> => {
    const socketPresent = Boolean(this.socket);
    const socketState = this.socket?.readyState ?? 'missing';
    console.debug(
      `[VoiceAgent] dataavailable size=${event.data.size} socketPresent=${socketPresent} socketState=${socketState}`,
    );
    if (!event.data.size || !this.socket || this.socket.readyState !== WebSocket.OPEN) {
      console.warn(
        `[VoiceAgent] Skipping audio chunk send hasData=${event.data.size > 0} socketPresent=${socketPresent} socketState=${socketState}`,
      );
      return;
    }

    const chunk = await event.data.arrayBuffer();
    console.debug(
      `[VoiceAgent] Sending audio chunk bytes=${chunk.byteLength} socketState=${this.socket.readyState}`,
    );
    this.socket.send(chunk);
  };

  private handleRecordingStop = (): void => {
    console.debug('[VoiceAgent] MediaRecorder stopped');
    this.cleanupRecorder();
  };

  private handleSocketMessage(rawData: string | ArrayBuffer): void {
    console.debug('[VoiceAgent] WebSocket message received', {
      kind: typeof rawData === 'string' ? 'text' : 'binary',
    });
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
    console.debug('[VoiceAgent] stopRecorder invoked', {
      recorderState: this.mediaRecorder?.state ?? 'missing',
    });
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
    console.debug('[VoiceAgent] stopStream invoked', {
      trackCount: this.mediaStream?.getTracks().length ?? 0,
    });
    this.mediaStream?.getTracks().forEach((track) => track.stop());
    this.mediaStream = undefined;
  }
}
