import type { MaintenanceTask, MaintenanceStatus, MaintenancePriority } from '@condoflow/types';

export interface MaintenanceFilters {
  status?: MaintenanceStatus;
  priority?: MaintenancePriority;
  search?: string;
}

export type { MaintenanceTask };
