import type { ReactNode } from 'react';
import { clsx } from 'clsx';

interface ListItemProps {
  title: string;
  subtitle?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function ListItem({
  title,
  subtitle,
  leading,
  trailing,
  onClick,
  className,
}: ListItemProps) {
  return (
    <div
      className={clsx(
        'flex items-center gap-3 rounded-lg px-3 py-2.5',
        onClick && 'cursor-pointer hover:bg-gray-50 transition-colors',
        className,
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {leading && <div className="shrink-0">{leading}</div>}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-gray-900">{title}</p>
        {subtitle && <p className="truncate text-xs text-gray-500">{subtitle}</p>}
      </div>
      {trailing && <div className="shrink-0">{trailing}</div>}
    </div>
  );
}
