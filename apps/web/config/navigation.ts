import type { FeatureName } from './features';

export interface NavItem {
  label: string;
  href: string;
  feature: FeatureName;
  icon: string;
}

export const navigationItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    feature: 'dashboard',
    icon: 'LayoutDashboard',
  },
  {
    label: 'Maintenance',
    href: '/maintenance',
    feature: 'maintenance',
    icon: 'Wrench',
  },
  {
    label: 'Incidents',
    href: '/incidents',
    feature: 'incidents',
    icon: 'AlertTriangle',
  },
  {
    label: 'Finance',
    href: '/finance',
    feature: 'finance',
    icon: 'DollarSign',
  },
  {
    label: 'Access Control',
    href: '/access-control',
    feature: 'access-control',
    icon: 'Shield',
  },
  {
    label: 'Communication',
    href: '/communication',
    feature: 'communication',
    icon: 'MessageSquare',
  },
];
