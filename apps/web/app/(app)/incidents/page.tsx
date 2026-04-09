'use client';

import { Header } from '@/components/organisms/Header';
import { PageContainer } from '@/components/organisms/PageContainer';
import { Button } from '@/components/atoms/Button';
import { Plus, Search } from 'lucide-react';
import { useIncidents } from '@/features/incidents/hooks/useIncidents';
import { IncidentCard } from '@/features/incidents/components/IncidentCard';
import { useFeatureFlags } from '@/hooks/useFeatureFlags';

export default function IncidentsPage() {
  const { filteredIncidents, isLoading, error, filters, setFilters } = useIncidents();
  const { can } = useFeatureFlags();
  const canCreate = can('incidents', 'create');

  return (
    <>
      <Header title="Incidents" subtitle="Track and resolve property incidents" />
      <PageContainer>
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Incidents{' '}
            <span className="ml-1 rounded-full bg-gray-100 px-2 py-0.5 text-sm font-normal text-gray-600">
              {filteredIncidents.length}
            </span>
          </h2>
          {canCreate && (
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Report Incident
            </Button>
          )}
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Search incidents..."
              value={filters.search ?? ''}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <select
            value={filters.status ?? ''}
            onChange={(e) =>
              setFilters({ ...filters, status: (e.target.value as typeof filters.status) || undefined })
            }
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
          >
            <option value="">All statuses</option>
            <option value="open">Open</option>
            <option value="investigating">Investigating</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>

          <select
            value={filters.severity ?? ''}
            onChange={(e) =>
              setFilters({ ...filters, severity: (e.target.value as typeof filters.severity) || undefined })
            }
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
          >
            <option value="">All severities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          </div>
        )}
        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}
        {!isLoading && !error && filteredIncidents.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-gray-400">No incidents found</p>
          </div>
        )}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredIncidents.map((incident) => (
            <IncidentCard key={incident.id} incident={incident} />
          ))}
        </div>
      </PageContainer>
    </>
  );
}
