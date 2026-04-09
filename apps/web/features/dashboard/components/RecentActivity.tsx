'use client';

import Link from 'next/link';
import { Card, CardHeader } from '@/components/molecules/Card';
import { Badge } from '@/components/atoms/Badge';
import { formatRelativeTime } from '@condoflow/utils';
import type { MaintenanceTask, Incident } from '@condoflow/types';

function priorityVariant(priority: MaintenanceTask['priority']) {
  const map = { low: 'neutral', medium: 'warning', high: 'danger', critical: 'danger' } as const;
  return map[priority];
}

function incidentVariant(severity: Incident['severity']) {
  const map = { low: 'neutral', medium: 'warning', high: 'danger', critical: 'danger' } as const;
  return map[severity];
}

interface RecentActivityProps {
  recentTasks: MaintenanceTask[];
  recentIncidents: Incident[];
}

export function RecentActivity({ recentTasks, recentIncidents }: RecentActivityProps) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader
          title="Recent Maintenance Tasks"
          action={
            <Link href="/maintenance" className="text-sm text-blue-600 hover:underline">
              View all
            </Link>
          }
        />
        <div className="mt-4 space-y-3">
          {recentTasks.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-4">No tasks yet</p>
          )}
          {recentTasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-gray-900">{task.title}</p>
                <p className="text-xs text-gray-400">{formatRelativeTime(task.updatedAt)}</p>
              </div>
              <Badge variant={priorityVariant(task.priority)} className="shrink-0">
                {task.priority}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader
          title="Recent Incidents"
          action={
            <Link href="/incidents" className="text-sm text-blue-600 hover:underline">
              View all
            </Link>
          }
        />
        <div className="mt-4 space-y-3">
          {recentIncidents.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-4">No incidents yet</p>
          )}
          {recentIncidents.map((incident) => (
            <div key={incident.id} className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-gray-900">{incident.title}</p>
                <p className="text-xs text-gray-400">{formatRelativeTime(incident.updatedAt)}</p>
              </div>
              <Badge variant={incidentVariant(incident.severity)} className="shrink-0">
                {incident.severity}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
