import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DoctorProfile } from '../models/doctor-profile.model';

@Injectable({ providedIn: 'root' })
export class DoctorService {
  private readonly API_BASE_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getCurrentDoctor(): Observable<DoctorProfile> {
    return this.http.get<DoctorProfile>(`${this.API_BASE_URL}/doctors/me`);
  }

  getDoctorById(doctorId: string): Observable<DoctorProfile> {
    return this.http.get<DoctorProfile>(`${this.API_BASE_URL}/doctors/${doctorId}`);
  }

  getCurrentDoctorLastName(): Observable<string> {
    return this.getCurrentDoctor().pipe(map((doctor) => doctor.lastName));
  }
}
