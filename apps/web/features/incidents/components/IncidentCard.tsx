'use client';

import { Badge } from '@/components/atoms/Badge';
import { Card } from '@/components/molecules/Card';
import { formatDate, formatRelativeTime } from '@condoflow/utils';
import { Clock } from 'lucide-react';
import type { Incident } from '@condoflow/types';

const statusVariant: Record<Incident['status'], 'neutral' | 'info' | 'success' | 'warning'> = {
  open: 'warning',
  investigating: 'info',
  resolved: 'success',
  closed: 'neutral',
};

const severityVariant: Record<Incident['severity'], 'neutral' | 'warning' | 'danger'> = {
  low: 'neutral',
  medium: 'warning',
  high: 'danger',
  critical: 'danger',
};

interface IncidentCardProps {
  incident: Incident;
}

export function IncidentCard({ incident }: IncidentCardProps) {
  const isOverdue = new Date(incident.slaDeadline) < new Date() && incident.status !== 'resolved' && incident.status !== 'closed';

  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-gray-900 truncate">{incident.title}</h3>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">{incident.description}</p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2">
          <Badge variant={statusVariant[incident.status]}>
            {incident.status.replace('_', ' ')}
          </Badge>
          <Badge variant={severityVariant[incident.severity]}>
            {incident.severity}
          </Badge>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-gray-500">
        <span>Reported by: <span className="font-medium text-gray-700">{incident.reporterName}</span></span>
        {incident.assigneeName && (
          <span>Assigned to: <span className="font-medium text-gray-700">{incident.assigneeName}</span></span>
        )}
        <span>Category: <span className="font-medium text-gray-700 capitalize">{incident.category.replace('_', ' ')}</span></span>
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-xs">
        <Clock className={`h-3.5 w-3.5 ${isOverdue ? 'text-red-500' : 'text-gray-400'}`} />
        <span className={isOverdue ? 'text-red-600 font-medium' : 'text-gray-500'}>
          SLA deadline: {formatDate(incident.slaDeadline)}
          {isOverdue && ' (overdue)'}
        </span>
        <span className="ml-auto text-gray-400">{formatRelativeTime(incident.updatedAt)}</span>
      </div>
    </Card>
  );
}
