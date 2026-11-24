import { forwardRef } from 'react';
import clsx from 'clsx';
import type { CheckboxProps } from './Checkbox.types';

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, disabled, className, id, ...props }, ref) => {
    const inputId = id || (typeof label === 'string' ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="inline-flex flex-col gap-1">
        <label
          className={clsx(
            'inline-flex items-center gap-2 cursor-pointer select-none text-sm text-black dark:text-white',
            disabled && 'opacity-50 cursor-not-allowed',
            className
          )}
        >
          <input
            ref={ref}
            type="checkbox"
            id={inputId}
            disabled={disabled}
            className="w-4 h-4 text-[#FF644B] rounded border-[#CDCDCD] dark:border-slate-700 focus:ring-[#FF644B] cursor-pointer disabled:cursor-not-allowed"
            {...props}
          />
          {label && <span>{label}</span>}
        </label>
        {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
