import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User, UserRole } from '../models/user.model';
import { Patient } from '../models/patient.model';
import { Doctor } from '../models/doctor.model';

export interface SignupPayload {
  email: string;
  password: string;
  role: UserRole;
  patient?: Omit<Patient, 'id' | 'user_id'>;
  doctor?: Omit<Doctor, 'id' | 'user_id'>;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'smartclinic_token';
  private readonly USER_KEY = 'smartclinic_user';

  constructor(private router: Router) {}

  login(email: string, password: string): Observable<{ user: User; token: string }> {
    // TODO: Replace with real API call
    return of({ user: { email, role: 'patient' } as User, token: 'placeholder-token' }).pipe(
      tap(({ user, token }) => {
        this.setSession(token, user);
      })
    );
  }

  signup(payload: SignupPayload): Observable<{ user: User; token: string }> {
    // TODO: Replace with real API call
    const user: User = { email: payload.email, role: payload.role };
    const token = 'placeholder-token';
    this.setSession(token, user);
    return of({ user, token });
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
}
