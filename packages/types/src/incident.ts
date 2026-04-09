export type IncidentStatus = 'open' | 'investigating' | 'resolved' | 'closed';
export type IncidentSeverity = 'low' | 'medium' | 'high' | 'critical';
export type IncidentCategory =
  | 'noise'
  | 'damage'
  | 'safety'
  | 'theft'
  | 'vandalism'
  | 'policy_violation'
  | 'other';

export interface IncidentComment {
  id: string;
  incidentId: string;
  authorId: string;
  authorName: string;
  content: string;
  isInternal: boolean;
  createdAt: string;
}

export interface Incident {
  id: string;
  consortiumId: string;
  title: string;
  description: string;
  status: IncidentStatus;
  severity: IncidentSeverity;
  category: IncidentCategory;
  reporterId: string;
  reporterName: string;
  assigneeId?: string;
  assigneeName?: string;
  unitId?: string;
  slaDeadline: string;
  resolvedAt?: string;
  comments: IncidentComment[];
  attachments: string[];
  createdAt: string;
  updatedAt: string;
}
