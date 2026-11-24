import { forwardRef } from 'react';
import clsx from 'clsx';
import type { InputProps } from './Input.types';

const sizeClasses = {
  sm: 'px-2.5 py-1 text-xs',
  md: 'px-3.5 py-2 text-sm',
  lg: 'px-4 py-2.5 text-base',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      inputSize = 'md',
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className={clsx('flex flex-col gap-1.5', fullWidth ? 'w-full' : 'w-auto')}>
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-black dark:text-white">
            {label}
          </label>
        )}

        <div className="relative flex items-center w-full">
          {leftIcon && (
            <div className="absolute left-3 flex items-center pointer-events-none text-black dark:text-white opacity-70">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={clsx(
              'w-full bg-white dark:bg-slate-800 text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50 border rounded-lg outline-none transition-all',
              'focus:ring-2 focus:ring-[#FF644B] focus:border-[#FF644B]',
              error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-[#CDCDCD] dark:border-slate-700',
              sizeClasses[inputSize],
              leftIcon && 'pl-9',
              rightIcon && 'pr-9',
              className
            )}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3 flex items-center pointer-events-none text-black dark:text-white opacity-70">
              {rightIcon}
            </div>
          )}
        </div>

        {error ? (
          <span className="text-xs text-red-500 font-medium">{error}</span>
        ) : helperText ? (
          <span className="text-xs text-black dark:text-white opacity-80">{helperText}</span>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
