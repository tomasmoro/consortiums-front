'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '@/store';
import { getIncidents } from '../services';
import type { Incident } from '@condoflow/types';
import type { IncidentFilters } from '../types';

interface UseIncidentsReturn {
  incidents: Incident[];
  filteredIncidents: Incident[];
  isLoading: boolean;
  error: string | null;
  filters: IncidentFilters;
  setFilters: (filters: IncidentFilters) => void;
  refresh: () => void;
}

export function useIncidents(): UseIncidentsReturn {
  const user = useAuthStore((s) => s.user);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<IncidentFilters>({});

  const load = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await getIncidents(user.consortiumId);
      setIncidents(data);
    } catch {
      setError('Failed to load incidents');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    void load();
  }, [load]);

  const filteredIncidents = incidents.filter((incident) => {
    if (filters.status && incident.status !== filters.status) return false;
    if (filters.severity && incident.severity !== filters.severity) return false;
    if (
      filters.search &&
      !incident.title.toLowerCase().includes(filters.search.toLowerCase()) &&
      !incident.description.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return { incidents, filteredIncidents, isLoading, error, filters, setFilters, refresh: load };
}
