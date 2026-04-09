'use client';

import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';
import { Search, Filter } from 'lucide-react';
import type { MaintenanceFilters } from '../types';

interface MaintenanceFiltersBarProps {
  filters: MaintenanceFilters;
  onChange: (filters: MaintenanceFilters) => void;
}

export function MaintenanceFiltersBar({ filters, onChange }: MaintenanceFiltersBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative flex-1 min-w-48">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="search"
          placeholder="Search tasks..."
          value={filters.search ?? ''}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <select
        value={filters.status ?? ''}
        onChange={(e) =>
          onChange({
            ...filters,
            status: (e.target.value as MaintenanceFilters['status']) || undefined,
          })
        }
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      >
        <option value="">All statuses</option>
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
      </select>

      <select
        value={filters.priority ?? ''}
        onChange={(e) =>
          onChange({
            ...filters,
            priority: (e.target.value as MaintenanceFilters['priority']) || undefined,
          })
        }
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      >
        <option value="">All priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="critical">Critical</option>
      </select>

      {(filters.status || filters.priority || filters.search) && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onChange({})}
        >
          Clear filters
        </Button>
      )}
    </div>
  );
}
