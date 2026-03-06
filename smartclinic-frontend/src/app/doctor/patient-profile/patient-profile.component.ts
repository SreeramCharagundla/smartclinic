import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  PatientProfile,
  Prescription,
  Vaccination,
  Vital,
} from '../models/patient-profile.model';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-patient-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule],
  templateUrl: './patient-profile.component.html',
  styleUrl: './patient-profile.component.css',
})
export class PatientProfileComponent implements OnInit {
  patient?: PatientProfile;

  readonly prescriptionColumns = [
    'medication',
    'dosage',
    'frequency',
    'startDate',
    'endDate',
    'instructions',
    'doctor',
  ];
  readonly vitalColumns = [
    'recordedAt',
    'heartRate',
    'bloodPressure',
    'temperature',
    'oxygenSaturation',
    'weight',
    'height',
  ];
  readonly vaccinationColumns = ['vaccine', 'doseNumber', 'date', 'provider'];

  readonly prescriptionsDataSource = new MatTableDataSource<Prescription>([]);
  readonly vitalsDataSource = new MatTableDataSource<Vital>([]);
  readonly vaccinationsDataSource = new MatTableDataSource<Vaccination>([]);

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const patientId = params.get('patientId');
          return patientId ? this.patientService.getPatientProfile(patientId) : of(undefined);
        })
      )
      .subscribe((patient) => {
        this.patient = patient;
        if (!patient) {
          return;
        }

        const patientId = this.route.snapshot.paramMap.get('patientId');
        if (!patientId) {
          return;
        }

        this.patientService
          .getPatientPrescriptions(patientId)
          .subscribe((prescriptions) => (this.prescriptionsDataSource.data = prescriptions));
        this.patientService
          .getPatientVitals(patientId)
          .subscribe((vitals) => (this.vitalsDataSource.data = vitals));
        this.patientService
          .getPatientVaccinations(patientId)
          .subscribe((vaccinations) => (this.vaccinationsDataSource.data = vaccinations));
      });
  }

  getAge(dob: string): number {
    const dobDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    const monthDiff = today.getMonth() - dobDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
      age--;
    }

    return age;
  }
}
