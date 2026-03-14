import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  Allergy,
  Condition,
  LabResult,
  PatientProfile,
  Prescription,
  Vaccination,
  Vital,
  VisitNote,
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
  readonly allergyColumns = ['allergen', 'reaction', 'severity', 'recordedAt'];
  readonly conditionColumns = ['conditionName', 'diagnosedDate', 'status', 'notes'];
  readonly labResultColumns = ['testName', 'resultValue', 'unit', 'referenceRange', 'resultDate'];
  readonly visitNoteColumns = ['createdAt', 'doctor', 'note'];

  readonly prescriptionsDataSource = new MatTableDataSource<Prescription>([]);
  readonly vitalsDataSource = new MatTableDataSource<Vital>([]);
  readonly vaccinationsDataSource = new MatTableDataSource<Vaccination>([]);
  readonly allergiesDataSource = new MatTableDataSource<Allergy>([]);
  readonly conditionsDataSource = new MatTableDataSource<Condition>([]);
  readonly labResultsDataSource = new MatTableDataSource<LabResult>([]);
  readonly visitNotesDataSource = new MatTableDataSource<VisitNote>([]);

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
        this.patientService
          .getPatientAllergies(patientId)
          .subscribe((allergies) => (this.allergiesDataSource.data = allergies));
        this.patientService
          .getPatientConditions(patientId)
          .subscribe((conditions) => (this.conditionsDataSource.data = conditions));
        this.patientService
          .getPatientLabResults(patientId)
          .subscribe((labResults) => (this.labResultsDataSource.data = labResults));
        this.patientService
          .getPatientVisitNotes(patientId)
          .subscribe((visitNotes) => (this.visitNotesDataSource.data = visitNotes));
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
