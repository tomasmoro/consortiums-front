import { getMaintenanceTasks } from '@/lib/api/maintenance';
import { getIncidents } from '@/lib/api/incidents';
import { getFinanceSummary } from '@/lib/api/finance';
import type { DashboardStats } from '../types';

export async function getDashboardStats(consortiumId: string): Promise<DashboardStats> {
  const [tasks, incidents, financeSummary] = await Promise.all([
    getMaintenanceTasks(consortiumId),
    getIncidents(consortiumId),
    getFinanceSummary(consortiumId),
  ]);

  return {
    totalMaintenanceTasks: tasks.length,
    pendingTasks: tasks.filter((t) => t.status === 'pending' || t.status === 'in_progress').length,
    openIncidents: incidents.filter((i) => i.status === 'open' || i.status === 'investigating').length,
    criticalIncidents: incidents.filter((i) => i.severity === 'critical' || i.severity === 'high').length,
    financeSummary,
    recentTasks: tasks.slice(0, 5),
    recentIncidents: incidents.slice(0, 5),
  };
}
