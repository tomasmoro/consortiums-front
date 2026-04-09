import type { ReactNode } from 'react';
import { clsx } from 'clsx';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: number;
    label: string;
    direction: 'up' | 'down' | 'neutral';
  };
  className?: string;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
}

const variantStyles = {
  default: 'bg-white border-gray-200',
  primary: 'bg-blue-50 border-blue-200',
  success: 'bg-green-50 border-green-200',
  warning: 'bg-yellow-50 border-yellow-200',
  danger: 'bg-red-50 border-red-200',
};

const trendColors = {
  up: 'text-green-600',
  down: 'text-red-600',
  neutral: 'text-gray-500',
};

export function StatCard({ title, value, icon, trend, className, variant = 'default' }: StatCardProps) {
  return (
    <div
      className={clsx(
        'rounded-xl border p-5 shadow-sm',
        variantStyles[variant],
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p className={clsx('mt-1 text-xs font-medium', trendColors[trend.direction])}>
              {trend.direction === 'up' ? '↑' : trend.direction === 'down' ? '↓' : '→'}{' '}
              {trend.value}% {trend.label}
            </p>
          )}
        </div>
        {icon && (
          <div className="rounded-lg bg-white/60 p-2 shadow-sm">{icon}</div>
        )}
      </div>
    </div>
  );
}
