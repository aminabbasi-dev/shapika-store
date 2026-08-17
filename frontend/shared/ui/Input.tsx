// shared/ui/Input.tsx

'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '../utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, label, id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="space-y-1 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-4 py-2.5 rounded-lg border transition-colors',
            'bg-white dark:bg-gray-900',
            'text-gray-900 dark:text-white',
            'placeholder:text-gray-400 dark:placeholder:text-gray-500',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
            error
              ? 'border-red-500 ring-1 ring-red-500'
              : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-500 dark:text-red-400 mt-1">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';