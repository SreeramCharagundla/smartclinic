import { Component, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../../shared/material/material.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-patient-registration-form',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, RouterLink],
  templateUrl: './patient-registration-form.component.html',
  styleUrl: './patient-registration-form.component.css',
})
export class PatientRegistrationFormComponent {
  formSubmit = output<{ email: string; password: string; patient: Record<string, unknown> }>();

  form: FormGroup;
  genders = ['Male', 'Female', 'Other'];
  bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      blood_type: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.value;
    const dob = v.dob instanceof Date ? v.dob.toISOString().slice(0, 10) : v.dob;
    this.formSubmit.emit({
      email: v.email,
      password: v.password,
      patient: {
        first_name: v.first_name,
        last_name: v.last_name,
        dob,
        gender: v.gender,
        phone: v.phone,
        address: v.address,
        blood_type: v.blood_type,
      },
    });
  }
}
