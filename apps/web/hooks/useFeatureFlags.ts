'use client';

import { useAuthStore } from '@/store';
import { rolePermissions } from '@/config/features';
import type { FeatureName, FeaturePermissions } from '@/config/features';

interface UseFeatureFlagsReturn {
  can: (feature: FeatureName, action: keyof FeaturePermissions) => boolean;
  getPermissions: (feature: FeatureName) => FeaturePermissions;
  hasAccess: (feature: FeatureName) => boolean;
}

export function useFeatureFlags(): UseFeatureFlagsReturn {
  const user = useAuthStore((state) => state.user);

  const getPermissions = (feature: FeatureName): FeaturePermissions => {
    if (!user) {
      return { view: false, create: false, edit: false, delete: false };
    }
    return rolePermissions[user.role][feature];
  };

  const can = (feature: FeatureName, action: keyof FeaturePermissions): boolean => {
    return getPermissions(feature)[action];
  };

  const hasAccess = (feature: FeatureName): boolean => {
    return can(feature, 'view');
  };

  return { can, getPermissions, hasAccess };
}
