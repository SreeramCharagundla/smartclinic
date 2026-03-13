import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./public/landing-page/landing-page.component').then(
        (m) => m.LandingPageComponent,
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/signup/signup.component').then(
        (m) => m.SignupComponent,
      ),
  },
  { path: 'signup', redirectTo: 'register', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(
        (m) => m.LoginComponent,
      ),
  },
  {
    path: 'doctor',
    loadComponent: () =>
      import('./doctor/doctor-layout/doctor-layout.component').then(
        (m) => m.DoctorLayoutComponent,
      ),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./doctor/doctor-dashboard/doctor-dashboard.component').then(
            (m) => m.DoctorDashboardComponent,
          ),
      },
      {
        path: 'appointments',
        loadComponent: () =>
          import('./doctor/appointments/appointments.component').then(
            (m) => m.AppointmentsComponent,
          ),
      },
      {
        path: 'patients',
        loadComponent: () =>
          import('./doctor/patient-search/patient-search.component').then(
            (m) => m.PatientSearchComponent,
          ),
        children: [
          {
            path: ':patientId',
            loadComponent: () =>
              import('./doctor/patient-profile/patient-profile.component').then(
                (m) => m.PatientProfileComponent,
              ),
          },
        ],
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./doctor/profile/doctor-profile.component').then(
            (m) => m.DoctorProfileComponent,
          ),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
