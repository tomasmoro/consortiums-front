'use client';

import { Wrench, AlertTriangle, DollarSign, CheckCircle } from 'lucide-react';
import { StatCard } from '@/components/molecules/StatCard';
import { formatCurrency } from '@condoflow/utils';
import type { DashboardStats } from '../types';

interface DashboardOverviewProps {
  stats: DashboardStats;
}

export function DashboardOverview({ stats }: DashboardOverviewProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Maintenance Tasks"
        value={stats.totalMaintenanceTasks}
        icon={<Wrench className="h-5 w-5 text-blue-600" />}
        variant="primary"
        trend={{ value: 12, label: 'vs last month', direction: 'up' }}
      />
      <StatCard
        title="Pending Tasks"
        value={stats.pendingTasks}
        icon={<CheckCircle className="h-5 w-5 text-yellow-600" />}
        variant="warning"
      />
      <StatCard
        title="Open Incidents"
        value={stats.openIncidents}
        icon={<AlertTriangle className="h-5 w-5 text-red-600" />}
        variant={stats.openIncidents > 3 ? 'danger' : 'default'}
      />
      <StatCard
        title="Monthly Balance"
        value={
          stats.financeSummary
            ? formatCurrency(stats.financeSummary.balance, stats.financeSummary.currency)
            : '—'
        }
        icon={<DollarSign className="h-5 w-5 text-green-600" />}
        variant={
          stats.financeSummary && stats.financeSummary.balance >= 0 ? 'success' : 'danger'
        }
      />
    </div>
  );
}
