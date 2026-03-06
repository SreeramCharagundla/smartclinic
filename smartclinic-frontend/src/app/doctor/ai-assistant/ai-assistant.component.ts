import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
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
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './ai-assistant.component.html',
  styleUrl: './ai-assistant.component.css',
})
export class AiAssistantComponent implements AfterViewInit {
  @ViewChild('messagesContainer') messagesContainer?: ElementRef<HTMLDivElement>;

  isOpen = false;
  isResponding = false;
  readonly messageControl = new FormControl('', { nonNullable: true });
  readonly messages: ChatMessage[] = [
    { sender: 'ai', text: 'Hello doctor. How can I help?' },
  ];

  constructor(private aiService: AiService) {}

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  toggleChat(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.scrollToBottom();
    }
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

    this.aiService.sendMessage(text).subscribe((reply) => {
      this.messages.push({ sender: 'ai', text: reply });
      this.isResponding = false;
      this.scrollToBottom();
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
}
