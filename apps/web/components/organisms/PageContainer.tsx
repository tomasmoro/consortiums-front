import type { ReactNode } from 'react';
import { clsx } from 'clsx';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <main className={clsx('flex-1 overflow-y-auto bg-gray-50 p-6', className)}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </main>
  );
}
