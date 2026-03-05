export interface Doctor {
  id?: number;
  user_id?: number;
  first_name: string;
  last_name: string;
  speciality: string;
  license_number: string;
  clinic_address: string;
  phone: string;
  dob?: string;
  gender?: string;
}
