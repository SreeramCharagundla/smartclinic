export type AppointmentStatus = 'SCHEDULED' | 'COMPLETED' | string;

export interface Appointment {
  appointmentId: string;
  patientId: string;
  patientName: string;
  appointmentTime: string;
  reason: string;
  status: AppointmentStatus;
}
