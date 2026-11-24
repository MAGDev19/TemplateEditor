import { useState } from 'react';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { SegmentedControlProps } from './SegmentedControl.types';

export const SegmentedControl = ({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  size = 'md',
  fullWidth = false,
  className,
  ...props
}: SegmentedControlProps) => {
  const [internalValue, setInternalValue] = useState(
    defaultValue || (options.length > 0 ? options[0].value : '')
  );

  const currentValue = controlledValue !== undefined ? controlledValue : internalValue;

  const handleSelect = (val: string, disabled?: boolean) => {
    if (disabled) return;
    if (controlledValue === undefined) {
      setInternalValue(val);
    }
    if (onChange) {
      onChange(val);
    }
  };

  const sizeClasses = {
    sm: 'p-0.5 text-xs gap-1',
    md: 'p-1 text-sm gap-1',
    lg: 'p-1.5 text-base gap-1.5',
  };

  const buttonSizeClasses = {
    sm: 'px-3 py-1 gap-1.5 font-medium',
    md: 'px-4 py-1.5 gap-2 font-semibold',
    lg: 'px-5 py-2.5 gap-2.5 font-semibold',
  };

  return (
    <div
      className={clsx(
        'inline-flex items-center bg-[#EBEBEB] dark:bg-slate-800/80 rounded-xl border border-[#CDCDCD] dark:border-slate-700/80 shadow-inner select-none',
        fullWidth ? 'flex w-full' : 'w-auto',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {options.map((opt) => {
        const isSelected = opt.value === currentValue;
        return (
          <button
            key={opt.value}
            type="button"
            disabled={opt.disabled}
            onClick={() => handleSelect(opt.value, opt.disabled)}
            className={clsx(
              'flex items-center justify-center rounded-lg transition-all duration-200 cursor-pointer border-0 bg-transparent',
              fullWidth ? 'flex-1' : '',
              buttonSizeClasses[size],
              isSelected
                ? 'bg-[#FF644B] !text-white font-bold shadow-sm'
                : 'text-black dark:text-white hover:bg-white/60 dark:hover:bg-slate-700/40',
              opt.disabled && 'opacity-40 cursor-not-allowed'
            )}
          >
            {opt.icon && <FontAwesomeIcon icon={opt.icon} className="text-sm" />}
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default SegmentedControl;
