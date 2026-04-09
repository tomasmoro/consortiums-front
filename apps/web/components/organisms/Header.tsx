'use client';

import { Bell } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const { user } = useAuth();

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div>
        {title && <h1 className="text-lg font-semibold text-gray-900">{title}</h1>}
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        <button className="relative rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-blue-600" />
        </button>
        {user && (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <span className="hidden text-sm font-medium text-gray-700 sm:block">{user.name}</span>
          </div>
        )}
      </div>
    </header>
  );
}
