import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../shared/material/material.module';
import { PatientRegistrationFormComponent } from '../forms/patient-registration-form/patient-registration-form.component';
import { DoctorRegistrationFormComponent } from '../forms/doctor-registration-form/doctor-registration-form.component';
import {
  AuthService,
  RegisterPatientPayload,
  RegisterDoctorPayload,
} from '../../../core/services/auth.service';
import { UserRole } from '../../../core/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { NavbarComponent } from '../../../public/navbar/navbar.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    NavbarComponent,
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

  onPatientSubmit(event: {
    email: string;
    password: string;
    patient: RegisterPatientPayload;
  }): void {
    this.auth.registerPatient(event.email, event.password, event.patient).subscribe({
      next: () => {
        this.snackBar.open('Registration successful', 'Close', { duration: 3000 });
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.snackBar.open(this.getErrorMessage(error), 'Close', { duration: 3000 });
      },
    });
  }

  onDoctorSubmit(event: {
    email: string;
    password: string;
    doctor: RegisterDoctorPayload;
  }): void {
    this.auth.registerDoctor(event.email, event.password, event.doctor).subscribe({
      next: () => {
        this.snackBar.open('Registration successful', 'Close', { duration: 3000 });
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.snackBar.open(this.getErrorMessage(error), 'Close', { duration: 3000 });
      },
    });
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      const backendMessage = error.error?.message;
      if (typeof backendMessage === 'string' && backendMessage.trim()) {
        return backendMessage;
      }
    }
    return 'Registration failed. Please check your details and try again.';
  }
}
