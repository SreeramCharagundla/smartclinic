export interface PatientProfile {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  phone: string;
  address: string;
  bloodType: string;
}

export interface Prescription {
  medication: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  instructions: string;
  doctor: string;
}

export interface Vital {
  recordedAt: string;
  heartRate: number;
  systolic: number;
  diastolic: number;
  temperature: number;
  oxygenSaturation: number;
  weight: number;
  height: number;
}

export interface Vaccination {
  vaccine: string;
  doseNumber: number;
  date: string;
  provider: string;
}
