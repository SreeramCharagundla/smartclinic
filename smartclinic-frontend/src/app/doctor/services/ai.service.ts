import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface AiChatRequest {
  message: string;
  patientId: string;
}

interface AiChatResponse {
  message: string;
}

@Injectable({ providedIn: 'root' })
export class AiService {
  private readonly API_BASE_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  sendMessage(message: string, patientId: string): Observable<string> {
    const payload: AiChatRequest = { message, patientId };
    return this.http
      .post<AiChatResponse>(`${this.API_BASE_URL}/api/ai/chat`, payload)
      .pipe(map((response) => response.message));
  }
}
