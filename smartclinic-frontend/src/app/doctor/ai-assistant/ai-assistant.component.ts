import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ChatMessage } from '../models/chat-message';
import { AiService } from '../services/ai.service';
import {
  VoiceAgentService,
  VoiceStatus,
} from '../services/voice-agent.service';

@Component({
  selector: 'app-ai-assistant',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSidenavModule,
    MarkdownModule,
  ],
  templateUrl: './ai-assistant.component.html',
  styleUrl: './ai-assistant.component.css',
})
export class AiAssistantComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('messagesContainer')
  messagesContainer?: ElementRef<HTMLDivElement>;
  @Input() copilotWidth = 420;

  isCopilotOpen = false;
  isResponding = false;
  isMicActive = false;
  isPatientContextActive = false;
  currentPatientId: string | null = null;
  voiceStatus: VoiceStatus = 'IDLE';
  readonly messageControl = new FormControl('', { nonNullable: true });
  readonly messages: ChatMessage[] = [
    { role: 'assistant', content: 'Hello doctor. How can I help?' },
  ];
  private resizing = false;

  private routeSubscription?: Subscription;
  private voiceStatusSubscription?: Subscription;
  private voiceTranscriptSubscription?: Subscription;

  constructor(
    private aiService: AiService,
    private voiceAgentService: VoiceAgentService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  ngOnInit(): void {
    this.updateCurrentPatientId();
    this.routeSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.updateCurrentPatientId());
    this.voiceStatusSubscription = this.voiceAgentService.status$.subscribe(
      (status) => {
        this.voiceStatus = status;
        if (status !== 'LISTENING') {
          this.isMicActive = false;
        }
      },
    );
    this.voiceTranscriptSubscription =
      this.voiceAgentService.transcript$.subscribe(({ message }) => {
        this.messages.push(message);
        this.scrollToBottom();
      });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.voiceStatusSubscription?.unsubscribe();
    this.voiceTranscriptSubscription?.unsubscribe();
    this.voiceAgentService.disconnect();
  }

  toggleCopilot(): void {
    if (!this.isPatientContextActive) {
      return;
    }

    this.isCopilotOpen = !this.isCopilotOpen;
    if (this.isCopilotOpen) {
      this.scrollToBottom();
    }
  }

  closeCopilot(): void {
    this.isCopilotOpen = false;
  }

  sendMessage(): void {
    const text = this.messageControl.value.trim();
    if (!text || this.isResponding) {
      return;
    }

    this.messages.push({ role: 'user', content: text });
    this.messageControl.setValue('');
    this.isResponding = true;
    this.scrollToBottom();

    if (!this.currentPatientId) {
      this.messages.push({
        role: 'assistant',
        content: 'Open a patient profile to ask context-aware clinical questions.',
      });
      this.isResponding = false;
      this.scrollToBottom();
      return;
    }

    this.aiService.sendMessage(text, this.currentPatientId).subscribe({
      next: (reply) => {
        this.messages.push({ role: 'assistant', content: reply });
        this.isResponding = false;
        this.scrollToBottom();
      },
      error: () => {
        this.messages.push({
          role: 'assistant',
          content: 'I could not fetch a response right now. Please try again.',
        });
        this.isResponding = false;
        this.scrollToBottom();
      },
    });
  }

  onEnter(event: Event): void {
    event.preventDefault();
    this.sendMessage();
  }

  async toggleMic(): Promise<void> {
    if (!this.isPatientContextActive) {
      return;
    }

    try {
      if (this.voiceStatus === 'AI_SPEAKING') {
        await this.voiceAgentService.interrupt();
        await this.voiceAgentService.startListening();
        this.isMicActive = true;
        return;
      }

      if (this.isMicActive) {
        this.voiceAgentService.stopListening();
        this.isMicActive = false;
        return;
      }

      await this.voiceAgentService.startListening();
      this.isMicActive = true;
    } catch {
      this.isMicActive = false;
      this.voiceStatus = 'IDLE';
      this.messages.push({
        role: 'assistant',
        content:
          'Voice mode is unavailable right now. Check microphone permissions and the voice agent connection.',
      });
      this.scrollToBottom();
    }
  }

  getVoiceStatusLabel(): string | null {
    switch (this.voiceStatus) {
      case 'LISTENING':
        return 'Listening...';
      case 'TRANSCRIBING':
        return 'Transcribing...';
      case 'AI_SPEAKING':
        return 'AI Speaking...';
      default:
        return null;
    }
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const container = this.messagesContainer?.nativeElement;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    });
  }

  private updateCurrentPatientId(): void {
    let route: ActivatedRoute | null = this.activatedRoute.root;

    while (route) {
      const patientId = route.snapshot.paramMap.get('patientId');
      if (patientId) {
        this.currentPatientId = patientId;
        this.isPatientContextActive = true;
        return;
      }
      route = route.firstChild;
    }

    this.currentPatientId = null;
    this.isPatientContextActive = false;
    this.isCopilotOpen = false;
    this.isMicActive = false;
    this.voiceAgentService.disconnect();
  }

  startResize(event: MouseEvent): void {
    this.resizing = true;

    document.addEventListener('mousemove', this.resizePanel);
    document.addEventListener('mouseup', this.stopResize);
  }

  resizePanel = (event: MouseEvent) => {
    if (!this.resizing) return;

    const newWidth = window.innerWidth - event.clientX;

    const minWidth = 280;
    const maxWidth = 700;

    this.copilotWidth = Math.max(minWidth, Math.min(newWidth, maxWidth));
  };

  stopResize = () => {
    this.resizing = false;

    document.removeEventListener('mousemove', this.resizePanel);
    document.removeEventListener('mouseup', this.stopResize);
  };
}
