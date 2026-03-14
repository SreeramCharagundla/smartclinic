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

export interface Allergy {
  id: string;
  allergen: string;
  reaction: string;
  severity: string;
  recordedAt: string;
}

export interface Condition {
  id: string;
  conditionName: string;
  diagnosedDate: string;
  status: string;
  notes: string;
}

export interface LabResult {
  id: string;
  testName: string;
  resultValue: string;
  unit: string;
  referenceRange: string;
  resultDate: string;
}

export interface VisitNote {
  id: string;
  doctorId: string;
  note: string;
  createdAt: string;
}
