'use client';

import { Header } from '@/components/organisms/Header';
import { PageContainer } from '@/components/organisms/PageContainer';
import { Button } from '@/components/atoms/Button';
import { Plus } from 'lucide-react';
import { useMaintenance } from '@/features/maintenance/hooks/useMaintenance';
import { MaintenanceCard } from '@/features/maintenance/components/MaintenanceCard';
import { MaintenanceFiltersBar } from '@/features/maintenance/components/MaintenanceFiltersBar';
import { useFeatureFlags } from '@/hooks/useFeatureFlags';

export default function MaintenancePage() {
  const { filteredTasks, isLoading, error, filters, setFilters } = useMaintenance();
  const { can } = useFeatureFlags();
  const canCreate = can('maintenance', 'create');

  return (
    <>
      <Header title="Maintenance" subtitle="Manage property maintenance tasks" />
      <PageContainer>
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Tasks{' '}
            <span className="ml-1 rounded-full bg-gray-100 px-2 py-0.5 text-sm font-normal text-gray-600">
              {filteredTasks.length}
            </span>
          </h2>
          {canCreate && (
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              New Task
            </Button>
          )}
        </div>

        <div className="mb-6">
          <MaintenanceFiltersBar filters={filters} onChange={setFilters} />
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
        {!isLoading && !error && filteredTasks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-gray-400">No tasks found</p>
            <p className="mt-1 text-sm text-gray-400">Try adjusting your filters</p>
          </div>
        )}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredTasks.map((task) => (
            <MaintenanceCard key={task.id} task={task} />
          ))}
        </div>
      </PageContainer>
    </>
  );
}
