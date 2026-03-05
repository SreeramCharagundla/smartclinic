import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../shared/material/material.module';
import { PatientRegistrationFormComponent } from '../forms/patient-registration-form/patient-registration-form.component';
import { DoctorRegistrationFormComponent } from '../forms/doctor-registration-form/doctor-registration-form.component';
import { AuthService, SignupPayload } from '../../../core/services/auth.service';
import { UserRole } from '../../../core/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    PatientRegistrationFormComponent,
    DoctorRegistrationFormComponent,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  role = new FormControl<UserRole>('patient', { nonNullable: true });

  constructor(
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onPatientSubmit(event: { email: string; password: string; patient: Record<string, unknown> }): void {
    const payload: SignupPayload = {
      email: event.email,
      password: event.password,
      role: 'patient',
      patient: event.patient as SignupPayload['patient'],
    };
    this.submitSignup(payload);
  }

  onDoctorSubmit(event: { email: string; password: string; doctor: Record<string, unknown> }): void {
    const payload: SignupPayload = {
      email: event.email,
      password: event.password,
      role: 'doctor',
      doctor: event.doctor as SignupPayload['doctor'],
    };
    this.submitSignup(payload);
  }

  private submitSignup(payload: SignupPayload): void {
    this.auth.signup(payload).subscribe({
      next: () => {
        this.snackBar.open('Registration successful', 'Close', { duration: 3000 });
        this.router.navigate(['/']);
      },
      error: () => {
        this.snackBar.open('Registration failed', 'Close', { duration: 3000 });
      },
    });
  }
}
