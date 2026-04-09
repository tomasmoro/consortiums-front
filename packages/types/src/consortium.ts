export type SecurityLevel = 'low' | 'medium' | 'high';
export type UnitType = 'apartment' | 'commercial' | 'parking' | 'storage';

export interface Consortium {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  securityLevel: SecurityLevel;
  totalUnits: number;
  adminId: string;
  contactEmail: string;
  contactPhone: string;
  createdAt: string;
  updatedAt: string;
}

export interface Unit {
  id: string;
  consortiumId: string;
  number: string;
  floor: number;
  type: UnitType;
  area: number;
  ownerId?: string;
  residentId?: string;
  isOccupied: boolean;
}
