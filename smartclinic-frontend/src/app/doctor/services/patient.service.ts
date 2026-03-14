import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PatientSearchResult } from '../models/patient-search-result.model';
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

interface ApiPrescription {
  medication: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  instructions: string;
  doctorName: string;
}

interface ApiVital {
  recordedAt: string;
  heartRate: number;
  systolicBp: number;
  diastolicBp: number;
  temperature: number;
  oxygenSaturation: number;
  weight: number;
  height: number;
}

interface ApiVaccination {
  vaccineName: string;
  doseNumber: number;
  administeredDate: string;
  provider: string;
}

interface ApiAllergy {
  id: string;
  allergen: string;
  reaction: string;
  severity: string;
  recordedAt: string;
}

interface ApiCondition {
  id: string;
  conditionName: string;
  diagnosedDate: string;
  status: string;
  notes: string;
}

interface ApiLabResult {
  id: string;
  testName: string;
  resultValue: string;
  unit: string;
  referenceRange: string;
  resultDate: string;
}

interface ApiVisitNote {
  id: string;
  doctorId: string;
  note: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class PatientService {
  private readonly API_BASE_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  searchPatients(query: string): Observable<PatientSearchResult[]> {
    return this.http.get<PatientSearchResult[]>(`${this.API_BASE_URL}/patients/search`, {
      params: { query },
    });
  }

  getPatientProfile(patientId: string): Observable<PatientProfile> {
    return this.http.get<PatientProfile>(`${this.API_BASE_URL}/patients/${patientId}`);
  }

  getPatientPrescriptions(patientId: string): Observable<Prescription[]> {
    return this.http
      .get<ApiPrescription[]>(`${this.API_BASE_URL}/patients/${patientId}/prescriptions`)
      .pipe(
        map((rows) =>
          rows.map((row) => ({
            medication: row.medication,
            dosage: row.dosage,
            frequency: row.frequency,
            startDate: row.startDate,
            endDate: row.endDate,
            instructions: row.instructions,
            doctor: row.doctorName,
          }))
        )
      );
  }

  getPatientVitals(patientId: string): Observable<Vital[]> {
    return this.http.get<ApiVital[]>(`${this.API_BASE_URL}/patients/${patientId}/vitals`).pipe(
      map((rows) =>
        rows.map((row) => ({
          recordedAt: row.recordedAt,
          heartRate: row.heartRate,
          systolic: row.systolicBp,
          diastolic: row.diastolicBp,
          temperature: row.temperature,
          oxygenSaturation: row.oxygenSaturation,
          weight: row.weight,
          height: row.height,
        }))
      )
    );
  }

  getPatientVaccinations(patientId: string): Observable<Vaccination[]> {
    return this.http
      .get<ApiVaccination[]>(`${this.API_BASE_URL}/patients/${patientId}/vaccinations`)
      .pipe(
        map((rows) =>
          rows.map((row) => ({
            vaccine: row.vaccineName,
            doseNumber: row.doseNumber,
            date: row.administeredDate,
            provider: row.provider,
          }))
        )
      );
  }

  getPatientAllergies(patientId: string): Observable<Allergy[]> {
    return this.http.get<ApiAllergy[]>(`${this.API_BASE_URL}/patients/${patientId}/allergies`).pipe(
      map((rows) =>
        rows.map((row) => ({
          id: row.id,
          allergen: row.allergen,
          reaction: row.reaction,
          severity: row.severity,
          recordedAt: row.recordedAt,
        }))
      )
    );
  }

  getPatientConditions(patientId: string): Observable<Condition[]> {
    return this.http
      .get<ApiCondition[]>(`${this.API_BASE_URL}/patients/${patientId}/conditions`)
      .pipe(
        map((rows) =>
          rows.map((row) => ({
            id: row.id,
            conditionName: row.conditionName,
            diagnosedDate: row.diagnosedDate,
            status: row.status,
            notes: row.notes,
          }))
        )
      );
  }

  getPatientLabResults(patientId: string): Observable<LabResult[]> {
    return this.http
      .get<ApiLabResult[]>(`${this.API_BASE_URL}/patients/${patientId}/lab-results`)
      .pipe(
        map((rows) =>
          rows.map((row) => ({
            id: row.id,
            testName: row.testName,
            resultValue: row.resultValue,
            unit: row.unit,
            referenceRange: row.referenceRange,
            resultDate: row.resultDate,
          }))
        )
      );
  }

  getPatientVisitNotes(patientId: string): Observable<VisitNote[]> {
    return this.http
      .get<ApiVisitNote[]>(`${this.API_BASE_URL}/patients/${patientId}/visit-notes`)
      .pipe(
        map((rows) =>
          rows.map((row) => ({
            id: row.id,
            doctorId: row.doctorId,
            note: row.note,
            createdAt: row.createdAt,
          }))
        )
      );
  }
}
