import type { LabelHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export function Label({ required, className, children, ...props }: LabelProps) {
  return (
    <label className={clsx('text-sm font-medium text-gray-700', className)} {...props}>
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
}
