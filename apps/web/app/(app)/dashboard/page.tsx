'use client';

import { Header } from '@/components/organisms/Header';
import { PageContainer } from '@/components/organisms/PageContainer';
import { useDashboard } from '@/features/dashboard/hooks/useDashboard';
import { DashboardOverview } from '@/features/dashboard/components/DashboardOverview';
import { RecentActivity } from '@/features/dashboard/components/RecentActivity';

export default function DashboardPage() {
  const { stats, isLoading, error } = useDashboard();

  return (
    <>
      <Header title="Dashboard" subtitle="Overview of your property" />
      <PageContainer>
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
        {stats && !isLoading && (
          <div className="space-y-6">
            <DashboardOverview stats={stats} />
            <RecentActivity
              recentTasks={stats.recentTasks}
              recentIncidents={stats.recentIncidents}
            />
          </div>
        )}
      </PageContainer>
    </>
  );
}
