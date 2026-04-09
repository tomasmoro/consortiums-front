'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '@/store';
import { getMaintenanceTasks } from '../services';
import type { MaintenanceTask } from '@condoflow/types';
import type { MaintenanceFilters } from '../types';

interface UseMaintenanceReturn {
  tasks: MaintenanceTask[];
  filteredTasks: MaintenanceTask[];
  isLoading: boolean;
  error: string | null;
  filters: MaintenanceFilters;
  setFilters: (filters: MaintenanceFilters) => void;
  refresh: () => void;
}

export function useMaintenance(): UseMaintenanceReturn {
  const user = useAuthStore((s) => s.user);
  const [tasks, setTasks] = useState<MaintenanceTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<MaintenanceFilters>({});

  const load = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await getMaintenanceTasks(user.consortiumId);
      setTasks(data);
    } catch {
      setError('Failed to load maintenance tasks');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    void load();
  }, [load]);

  const filteredTasks = tasks.filter((task) => {
    if (filters.status && task.status !== filters.status) return false;
    if (filters.priority && task.priority !== filters.priority) return false;
    if (
      filters.search &&
      !task.title.toLowerCase().includes(filters.search.toLowerCase()) &&
      !task.description.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return { tasks, filteredTasks, isLoading, error, filters, setFilters, refresh: load };
}
