import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Appointment, AppointmentStatus } from '../models/appointment.model';
import { AppointmentService } from '../services/appointment.service';
import { DoctorService } from '../services/doctor.service';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatChipsModule, MatButtonModule],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css',
})
export class AppointmentsComponent implements OnInit {
  readonly displayedColumns = ['time', 'patient', 'reason', 'status', 'action'];
  readonly dataSource = new MatTableDataSource<Appointment>([]);

  constructor(
    private appointmentService: AppointmentService,
    private doctorService: DoctorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.doctorService
      .getCurrentDoctor()
      .pipe(switchMap((doctor) => this.appointmentService.getTodaysAppointments(doctor.id)))
      .subscribe((appointments) => {
        this.dataSource.data = appointments;
      });
  }

  viewPatient(patientId: string): void {
    this.router.navigate(['/doctor/patients', patientId]);
  }

  getStatusColor(status: AppointmentStatus): string {
    return status.toUpperCase() === 'COMPLETED' ? '#2e7d32' : '#1565c0';
  }
}
