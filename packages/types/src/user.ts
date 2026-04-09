export type UserRole = 'superadmin' | 'admin' | 'resident' | 'technician';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  consortiumId: string;
  unitId?: string;
  avatarUrl?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthSession {
  user: User;
  token: string;
  expiresAt: string;
}
