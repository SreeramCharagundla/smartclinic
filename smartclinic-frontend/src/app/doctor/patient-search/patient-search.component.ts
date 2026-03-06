import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs/operators';
import { PatientSearchResult } from '../models/patient-search-result.model';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-patient-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
  ],
  templateUrl: './patient-search.component.html',
  styleUrl: './patient-search.component.css',
})
export class PatientSearchComponent {
  readonly searchControl = new FormControl<string | PatientSearchResult>('');
  readonly filteredPatients$: Observable<PatientSearchResult[]>;

  constructor(
    private patientService: PatientService,
    private router: Router
  ) {
    this.filteredPatients$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((value) => {
        const query =
          typeof value === 'string'
            ? value
            : value
              ? `${value.firstName} ${value.lastName}`
              : '';
        return query ? this.patientService.searchPatients(query) : of([]);
      })
    );
  }

  displayPatientName(patient: PatientSearchResult | string | null): string {
    if (!patient) {
      return '';
    }
    if (typeof patient === 'string') {
      return patient;
    }
    return `${patient.firstName} ${patient.lastName}`;
  }

  onPatientSelected(event: MatAutocompleteSelectedEvent): void {
    const selectedPatient = event.option.value as PatientSearchResult;
    this.router.navigate(['/doctor/patients', selectedPatient.id]);
  }
}
