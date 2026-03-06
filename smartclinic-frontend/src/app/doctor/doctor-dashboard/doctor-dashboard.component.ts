import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DoctorService } from '../services/doctor.service';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './doctor-dashboard.component.html',
})
export class DoctorDashboardComponent {
  readonly lastName$ = this.doctorService.getCurrentDoctorLastName();

  constructor(private doctorService: DoctorService) {}
}
