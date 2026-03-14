import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DoctorService } from '../services/doctor.service';

@Component({
  selector: 'app-doctor-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './doctor-profile.component.html',
  styleUrl: './doctor-profile.component.css',
})
export class DoctorProfileComponent {
  readonly doctor$ = this.doctorService.getCurrentDoctor();

  constructor(private doctorService: DoctorService) {}
}
