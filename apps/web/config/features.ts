import type { UserRole } from '@condoflow/types';

export type FeatureName =
  | 'dashboard'
  | 'maintenance'
  | 'incidents'
  | 'finance'
  | 'access-control'
  | 'communication';

export type PermissionAction = 'view' | 'create' | 'edit' | 'delete';

export type FeaturePermissions = Record<PermissionAction, boolean>;
export type RoleFeatureMap = Record<FeatureName, FeaturePermissions>;

const allPermissions: FeaturePermissions = {
  view: true,
  create: true,
  edit: true,
  delete: true,
};

const viewOnly: FeaturePermissions = {
  view: true,
  create: false,
  edit: false,
  delete: false,
};

const viewCreate: FeaturePermissions = {
  view: true,
  create: true,
  edit: false,
  delete: false,
};

const noAccess: FeaturePermissions = {
  view: false,
  create: false,
  edit: false,
  delete: false,
};

export const rolePermissions: Record<UserRole, RoleFeatureMap> = {
  superadmin: {
    dashboard: allPermissions,
    maintenance: allPermissions,
    incidents: allPermissions,
    finance: allPermissions,
    'access-control': allPermissions,
    communication: allPermissions,
  },
  admin: {
    dashboard: allPermissions,
    maintenance: allPermissions,
    incidents: allPermissions,
    finance: allPermissions,
    'access-control': allPermissions,
    communication: allPermissions,
  },
  resident: {
    dashboard: viewOnly,
    maintenance: viewCreate,
    incidents: viewCreate,
    finance: viewOnly,
    'access-control': {
      view: true,
      create: true,
      edit: false,
      delete: false,
    },
    communication: viewCreate,
  },
  technician: {
    dashboard: viewOnly,
    maintenance: {
      view: true,
      create: false,
      edit: true,
      delete: false,
    },
    incidents: viewOnly,
    finance: noAccess,
    'access-control': viewOnly,
    communication: viewOnly,
  },
};
