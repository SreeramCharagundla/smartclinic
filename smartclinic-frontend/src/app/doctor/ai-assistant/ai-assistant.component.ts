import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AiService } from '../services/ai.service';

interface ChatMessage {
  sender: 'doctor' | 'ai';
  text: string;
}

@Component({
  selector: 'app-ai-assistant',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
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
  @ViewChild('messagesContainer') messagesContainer?: ElementRef<HTMLDivElement>;
  @Input() copilotWidth = '420px';

  isCopilotOpen = false;
  isResponding = false;
  isPatientContextActive = false;
  currentPatientId: string | null = null;
  readonly messageControl = new FormControl('', { nonNullable: true });
  readonly messages: ChatMessage[] = [
    { sender: 'ai', text: 'Hello doctor. How can I help?' },
  ];

  private routeSubscription?: Subscription;

  constructor(
    private aiService: AiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  ngOnInit(): void {
    this.updateCurrentPatientId();
    this.routeSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.updateCurrentPatientId());
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
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

    this.messages.push({ sender: 'doctor', text });
    this.messageControl.setValue('');
    this.isResponding = true;
    this.scrollToBottom();

    if (!this.currentPatientId) {
      this.messages.push({
        sender: 'ai',
        text: 'Open a patient profile to ask context-aware clinical questions.',
      });
      this.isResponding = false;
      this.scrollToBottom();
      return;
    }

    this.aiService.sendMessage(text, this.currentPatientId).subscribe({
      next: (reply) => {
        this.messages.push({ sender: 'ai', text: reply });
        this.isResponding = false;
        this.scrollToBottom();
      },
      error: () => {
        this.messages.push({
          sender: 'ai',
          text: 'I could not fetch a response right now. Please try again.',
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
  }
}
