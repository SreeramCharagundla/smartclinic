import { Component, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../../shared/material/material.module';
import { RouterLink } from '@angular/router';
import { PHONE_PATTERN } from '../../../../core/validators/validation-patterns';
import { RegisterDoctorPayload } from '../../../../core/services/auth.service';

const PASSWORD_MIN_LENGTH = 6;

@Component({
  selector: 'app-doctor-registration-form',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, RouterLink],
  templateUrl: './doctor-registration-form.component.html',
  styleUrl: './doctor-registration-form.component.css',
})
export class DoctorRegistrationFormComponent {
  formSubmit = output<{ email: string; password: string; doctor: RegisterDoctorPayload }>();

  form: FormGroup;
  genders = ['Male', 'Female', 'Other'];
  specialities = [
    'General Practice',
    'Cardiology',
    'Dermatology',
    'Pediatrics',
    'Orthopedics',
    'Neurology',
    'Psychiatry',
    'Other',
  ];
  readonly passwordMinLength = PASSWORD_MIN_LENGTH;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(PHONE_PATTERN)]],
      speciality: ['', Validators.required],
      license_number: ['', Validators.required],
      clinic_address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(PASSWORD_MIN_LENGTH)]],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.value;
    const dob = v.dob instanceof Date ? v.dob.toISOString().slice(0, 10) : v.dob;
    const doctor: RegisterDoctorPayload = {
      first_name: v.first_name,
      last_name: v.last_name,
      dob,
      gender: v.gender,
      phone: v.phone,
      speciality: v.speciality,
      license_number: v.license_number,
      clinic_address: v.clinic_address,
    };
    this.formSubmit.emit({ email: v.email, password: v.password, doctor });
  }
}
