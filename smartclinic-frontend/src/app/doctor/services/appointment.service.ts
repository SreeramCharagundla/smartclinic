import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../models/appointment.model';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private readonly API_BASE_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getTodaysAppointments(doctorId: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(
      `${this.API_BASE_URL}/doctors/${doctorId}/appointments/today`
    );
  }
}
