'use client';

import { Badge } from '@/components/atoms/Badge';
import { Card } from '@/components/molecules/Card';
import { formatDate } from '@condoflow/utils';
import type { MaintenanceTask } from '@condoflow/types';

const statusVariant: Record<MaintenanceTask['status'], 'neutral' | 'info' | 'success' | 'warning'> = {
  pending: 'neutral',
  in_progress: 'info',
  completed: 'success',
  cancelled: 'neutral',
};

const priorityVariant: Record<MaintenanceTask['priority'], 'neutral' | 'warning' | 'danger' | 'danger'> = {
  low: 'neutral',
  medium: 'warning',
  high: 'danger',
  critical: 'danger',
};

interface MaintenanceCardProps {
  task: MaintenanceTask;
}

export function MaintenanceCard({ task }: MaintenanceCardProps) {
  const completedCount = task.checklist.filter((c) => c.completed).length;
  const totalCount = task.checklist.length;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-gray-900 truncate">{task.title}</h3>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">{task.description}</p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2">
          <Badge variant={statusVariant[task.status]}>
            {task.status.replace('_', ' ')}
          </Badge>
          <Badge variant={priorityVariant[task.priority]}>
            {task.priority}
          </Badge>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-500">
        {task.assigneeName && (
          <span>Assigned to: <span className="font-medium text-gray-700">{task.assigneeName}</span></span>
        )}
        {task.scheduledDate && (
          <span>Scheduled: <span className="font-medium text-gray-700">{formatDate(task.scheduledDate)}</span></span>
        )}
        <span>Category: <span className="font-medium text-gray-700 capitalize">{task.category}</span></span>
      </div>

      {totalCount > 0 && (
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>Checklist</span>
            <span>{completedCount}/{totalCount}</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-blue-500 transition-all"
              style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
            />
          </div>
        </div>
      )}
    </Card>
  );
}
