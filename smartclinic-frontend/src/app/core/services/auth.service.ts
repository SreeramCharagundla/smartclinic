import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Patient } from '../models/patient.model';
import { Doctor } from '../models/doctor.model';

/** Payload for backend: patients table. */
export type RegisterPatientPayload = Omit<Patient, 'id' | 'user_id'>;

/** Payload for backend: doctors table. */
export type RegisterDoctorPayload = Omit<Doctor, 'id' | 'user_id'>;

interface ApiUser {
  email: string;
  role: string;
}

interface AuthResponse {
  token: string;
  user: ApiUser;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'smartclinic_token';
  private readonly USER_KEY = 'smartclinic_user';
  private readonly API_BASE_URL = 'http://localhost:8080';
  private readonly AUTH_URL = `${this.API_BASE_URL}/auth`;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

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
    return this.http
      .post<AuthResponse>(`${this.AUTH_URL}/register/patient`, payload)
      .pipe(this.toSessionResponse());
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
    return this.http
      .post<AuthResponse>(`${this.AUTH_URL}/register/doctor`, payload)
      .pipe(this.toSessionResponse());
  }

  /**
   * Login. Payload matches backend auth (email + password).
   * UI foundation only – no HTTP call yet.
   */
  login(email: string, password: string): Observable<{ user: User; token: string }> {
    return this.http
      .post<AuthResponse>(`${this.AUTH_URL}/login`, { email, password })
      .pipe(this.toSessionResponse());
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
  ): { email: string; password: string; patient: RegisterPatientPayload } {
    return {
      email,
      password,
      patient: { ...patient },
    };
  }

  /** Payload structure for backend: doctor registration request. */
  private buildDoctorRegistrationPayload(
    email: string,
    password: string,
    doctor: RegisterDoctorPayload
  ): { email: string; password: string; doctor: RegisterDoctorPayload } {
    return {
      email,
      password,
      doctor: { ...doctor },
    };
  }

  private toSessionResponse() {
    return (source: Observable<AuthResponse>) =>
      source.pipe(
        map((response) => ({
          token: response.token,
          user: this.mapApiUser(response.user),
        })),
        tap(({ token, user }) => this.setSession(token, user))
      );
  }

  private mapApiUser(apiUser: ApiUser): User {
    return {
      email: apiUser.email,
      role: this.normalizeRole(apiUser.role),
    };
  }

  private normalizeRole(role: string): 'patient' | 'doctor' {
    return role?.toLowerCase() === 'doctor' ? 'doctor' : 'patient';
  }
}
