import { forwardRef } from 'react';
import clsx from 'clsx';
import type { SwitchProps } from './Switch.types';

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, checked, disabled, className, onChange, ...props }, ref) => {
    return (
      <label
        className={clsx(
          'inline-flex items-center gap-3 cursor-pointer select-none text-sm text-black dark:text-white',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
      >
        <input
          ref={ref}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          className="sr-only"
          {...props}
        />
        <div
          className={clsx(
            'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 ease-in-out',
            checked ? 'bg-[#FF644B]' : 'bg-[#CDCDCD] dark:bg-slate-700'
          )}
        >
          <span
            className={clsx(
              'inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition duration-200 ease-in-out',
              checked ? 'translate-x-5' : 'translate-x-0.5'
            )}
          />
        </div>
        {label && <span>{label}</span>}
      </label>
    );
  }
);

Switch.displayName = 'Switch';

export default Switch;
