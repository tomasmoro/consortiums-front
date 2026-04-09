'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store';
import type { User } from '@condoflow/types';

const MOCK_USERS: User[] = [
  {
    id: 'user-1',
    name: 'Alice Admin',
    email: 'admin@condoflow.com',
    role: 'admin',
    consortiumId: 'consortium-1',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-2',
    name: 'Bob Resident',
    email: 'resident@condoflow.com',
    role: 'resident',
    consortiumId: 'consortium-1',
    unitId: 'unit-101',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-3',
    name: 'Carlos Tech',
    email: 'tech@condoflow.com',
    role: 'technician',
    consortiumId: 'consortium-1',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-sa',
    name: 'Super Admin',
    email: 'superadmin@condoflow.com',
    role: 'superadmin',
    consortiumId: 'consortium-1',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

export function useAuth(): UseAuthReturn {
  const { user, isAuthenticated, isLoading, setUser, clearAuth, setLoading } = useAuthStore();
  const router = useRouter();

  const login = useCallback(
    async (email: string, _password: string): Promise<{ success: boolean; error?: string }> => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));

      const found = MOCK_USERS.find((u) => u.email === email);
      if (!found) {
        setLoading(false);
        return { success: false, error: 'Invalid credentials' };
      }

      setUser(found, `mock-token-${found.id}`);
      return { success: true };
    },
    [setUser, setLoading],
  );

  const logout = useCallback(() => {
    clearAuth();
    router.push('/login');
  }, [clearAuth, router]);

  return { user, isAuthenticated, isLoading, login, logout };
}
