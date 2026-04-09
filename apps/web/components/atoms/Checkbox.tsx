import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { clsx } from 'clsx';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, id, className, ...props },
  ref,
) {
  return (
    <div className="flex items-center gap-2">
      <input
        ref={ref}
        type="checkbox"
        id={id}
        className={clsx(
          'h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500',
          className,
        )}
        {...props}
      />
      {label && (
        <label htmlFor={id} className="text-sm text-gray-700 cursor-pointer">
          {label}
        </label>
      )}
    </div>
  );
});
