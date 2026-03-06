import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AiService {
  sendMessage(message: string): Observable<string> {
    const query = message.toLowerCase();

    if (query.includes('vitals')) {
      return of('Vitals trend appears stable, with no major abnormal changes in recent records.').pipe(delay(500));
    }

    if (query.includes('patient') || query.includes('summarize')) {
      return of('Patient summary: condition appears stable with ongoing follow-up recommended.').pipe(delay(500));
    }

    if (query.includes('appointment')) {
      return of('You can review today\'s appointments in the Appointments section for timing and status.').pipe(delay(500));
    }

    return of('I can help summarize patient history, vitals, and visit context.').pipe(delay(500));
  }
}
