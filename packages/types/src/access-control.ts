export type VisitorStatus = 'expected' | 'arrived' | 'departed' | 'denied';
export type AccessType = 'resident' | 'visitor' | 'delivery' | 'service' | 'emergency';

export interface Visitor {
  id: string;
  consortiumId: string;
  name: string;
  documentId: string;
  phone?: string;
  visitingUnitId: string;
  visitingUnitNumber: string;
  hostId: string;
  hostName: string;
  expectedArrival?: string;
  actualArrival?: string;
  departure?: string;
  status: VisitorStatus;
  notes?: string;
  vehiclePlate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AccessLog {
  id: string;
  consortiumId: string;
  personId: string;
  personName: string;
  accessType: AccessType;
  direction: 'entry' | 'exit';
  timestamp: string;
  gateId: string;
  authorizedBy?: string;
  vehiclePlate?: string;
  notes?: string;
}
