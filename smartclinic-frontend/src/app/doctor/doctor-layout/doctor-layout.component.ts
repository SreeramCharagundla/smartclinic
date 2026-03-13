import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';
import { DoctorService } from '../services/doctor.service';

@Component({
  selector: 'app-doctor-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './doctor-layout.component.html',
  styleUrl: './doctor-layout.component.css',
})
export class DoctorLayoutComponent {
  isHandset = false;

  readonly isHandset$ = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay({ bufferSize: 1, refCount: true })
    );

  readonly doctor$ = this.doctorService.getCurrentDoctor();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private doctorService: DoctorService,
    private authService: AuthService,
    private router: Router
  ) {
    this.isHandset$.subscribe((isHandset) => {
      this.isHandset = isHandset;
    });
  }

  logout(): void {
    this.authService.logout();
  }

  goTo(route: string): void {
    this.router.navigate([route]);
  }

  closeIfHandset(sidenav: MatSidenav, isHandset: boolean | null): void {
    if (isHandset) {
      sidenav.close();
    }
  }
}
