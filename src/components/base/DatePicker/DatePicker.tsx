import { forwardRef } from 'react';
import clsx from 'clsx';
import type { DatePickerProps } from './DatePicker.types';

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={inputId} className="text-sm font-bold text-black dark:text-white">
            {label}
          </label>
        )}
        <input
          ref={ref}
          type="date"
          id={inputId}
          className={clsx(
            'w-full px-3.5 py-2 text-sm bg-white dark:bg-slate-800 text-black dark:text-white border rounded-lg outline-none transition-all',
            'focus:ring-2 focus:ring-[#FF644B] focus:border-[#FF644B]',
            error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-[#CDCDCD] dark:border-slate-700',
            className
          )}
          {...props}
        />
        {error ? (
          <span className="text-xs text-red-500 font-medium">{error}</span>
        ) : helperText ? (
          <span className="text-xs text-black dark:text-white opacity-70">{helperText}</span>
        ) : null}
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';

export default DatePicker;
