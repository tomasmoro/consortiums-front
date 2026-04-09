import type { Incident, IncidentStatus, IncidentSeverity } from '@condoflow/types';

export interface IncidentFilters {
  status?: IncidentStatus;
  severity?: IncidentSeverity;
  search?: string;
}

export type { Incident };
