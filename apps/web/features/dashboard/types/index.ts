import type { MaintenanceTask, Incident, FinanceSummary } from '@condoflow/types';

export interface DashboardStats {
  totalMaintenanceTasks: number;
  pendingTasks: number;
  openIncidents: number;
  criticalIncidents: number;
  financeSummary: FinanceSummary | null;
  recentTasks: MaintenanceTask[];
  recentIncidents: Incident[];
}
