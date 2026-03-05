export type UserRole = 'patient' | 'doctor';

export interface User {
  id?: number;
  email: string;
  password_hash?: string;
  role: UserRole;
  created_at?: string;
}
