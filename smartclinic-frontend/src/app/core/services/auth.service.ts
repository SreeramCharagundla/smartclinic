import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Patient } from '../models/patient.model';
import { Doctor } from '../models/doctor.model';

/** Payload for backend: users table (password sent as plaintext; backend hashes). */
export interface RegisterUserPayload {
  email: string;
  password: string;
  role: 'patient' | 'doctor';
}

/** Payload for backend: patients table. */
export type RegisterPatientPayload = Omit<Patient, 'id' | 'user_id'>;

/** Payload for backend: doctors table. */
export type RegisterDoctorPayload = Omit<Doctor, 'id' | 'user_id'>;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'smartclinic_token';
  private readonly USER_KEY = 'smartclinic_user';

  constructor(private router: Router) {}

  /**
   * Register a patient. Builds payload matching backend (User + Patient).
   * UI foundation only – no HTTP call yet.
   */
  registerPatient(
    email: string,
    password: string,
    patient: RegisterPatientPayload
  ): Observable<{ user: User; token: string }> {
    const payload = this.buildPatientRegistrationPayload(email, password, patient);
    // TODO: POST to backend, then setSession from response
    const user: User = { email: payload.user.email, role: 'patient' };
    const token = 'placeholder-token';
    return of({ user, token }).pipe(tap(() => this.setSession(token, user)));
  }

  /**
   * Register a doctor. Builds payload matching backend (User + Doctor).
   * UI foundation only – no HTTP call yet.
   */
  registerDoctor(
    email: string,
    password: string,
    doctor: RegisterDoctorPayload
  ): Observable<{ user: User; token: string }> {
    const payload = this.buildDoctorRegistrationPayload(email, password, doctor);
    // TODO: POST to backend, then setSession from response
    const user: User = { email: payload.user.email, role: 'doctor' };
    const token = 'placeholder-token';
    return of({ user, token }).pipe(tap(() => this.setSession(token, user)));
  }

  /**
   * Login. Payload matches backend auth (email + password).
   * UI foundation only – no HTTP call yet.
   */
  login(email: string, password: string): Observable<{ user: User; token: string }> {
    // TODO: POST to backend auth endpoint, then setSession from response
    const user: User = { email, role: 'patient' };
    const token = 'placeholder-token';
    return of({ user, token }).pipe(
      tap(({ user: u, token: t }) => this.setSession(t, u))
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getCurrentUser(): User | null {
    const data = localStorage.getItem(this.USER_KEY);
    return data ? JSON.parse(data) : null;
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private setSession(token: string, user: User): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  /** Payload structure for backend: user + patient. */
  private buildPatientRegistrationPayload(
    email: string,
    password: string,
    patient: RegisterPatientPayload
  ): { user: RegisterUserPayload; patient: RegisterPatientPayload } {
    return {
      user: { email, password, role: 'patient' },
      patient: { ...patient },
    };
  }

  /** Payload structure for backend: user + doctor. */
  private buildDoctorRegistrationPayload(
    email: string,
    password: string,
    doctor: RegisterDoctorPayload
  ): { user: RegisterUserPayload; doctor: RegisterDoctorPayload } {
    return {
      user: { email, password, role: 'doctor' },
      doctor: { ...doctor },
    };
  }
}
