import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faExclamation } from '@fortawesome/free-solid-svg-icons';
import type { StepperProps } from './Stepper.types';

export const Stepper = ({
  steps,
  current = 0,
  direction = 'horizontal',
  variant = 'default',
  onChange,
  className,
  ...props
}: StepperProps) => {
  const isVertical = direction === 'vertical';

  return (
    <div
      className={clsx(
        'w-full',
        isVertical ? 'flex flex-col gap-6' : 'flex flex-row items-start justify-between gap-4 overflow-x-auto no-scrollbar py-2',
        className
      )}
      {...props}
    >
      {steps.map((step, idx) => {
        // Resolve step status relative to `current`
        let status = step.status;
        if (!status) {
          if (idx < current) status = 'finish';
          else if (idx === current) status = 'process';
          else status = 'wait';
        }

        const isFinish = status === 'finish';
        const isProcess = status === 'process';
        const isError = status === 'error';

        const isClickable = onChange && !step.disabled;

        return (
          <div
            key={idx}
            className={clsx(
              'flex relative flex-1',
              isVertical ? 'flex-row items-start gap-4' : 'flex-col sm:flex-row items-center sm:items-start gap-3',
              isClickable && 'cursor-pointer group'
            )}
            onClick={() => isClickable && onChange(idx)}
          >
            {/* Step Icon / Circle */}
            <div className="flex flex-col items-center">
              <div
                className={clsx(
                  'rounded-full flex items-center justify-center font-bold transition-all shadow-sm z-10',
                  variant === 'dots' ? 'w-5 h-5 mt-2' : 'w-10 h-10 text-sm',
                  isFinish && 'bg-emerald-600 text-white shadow-emerald-500/20',
                  isProcess && 'bg-[#FF644B] text-white ring-4 ring-[#FFF0ED] dark:ring-slate-700 shadow-sm',
                  isError && 'bg-rose-600 text-white ring-4 ring-rose-100 dark:ring-rose-900/50',
                  status === 'wait' && 'bg-[#EBEBEB] dark:bg-slate-800 text-black dark:text-white border border-[#CDCDCD] dark:border-slate-700',
                  isClickable && 'group-hover:scale-105'
                )}
              >
                {variant === 'dots' ? null : isFinish && variant !== 'numbers' ? (
                  <FontAwesomeIcon icon={faCheck} className="text-sm" />
                ) : isError ? (
                  <FontAwesomeIcon icon={faExclamation} className="text-sm" />
                ) : step.icon && variant !== 'numbers' ? (
                  <FontAwesomeIcon icon={step.icon} className="text-sm" />
                ) : (
                  <span>{idx + 1}</span>
                )}
              </div>
            </div>

            {/* Step Text Info */}
            <div className={clsx('flex-1', !isVertical && 'text-center sm:text-left')}>
              <div
                className={clsx(
                  'text-sm font-bold transition-colors',
                  isProcess && 'text-[#FF644B]',
                  isFinish && 'text-black dark:text-white',
                  isError && 'text-rose-600 dark:text-rose-400',
                  status === 'wait' && 'text-black dark:text-white opacity-70'
                )}
              >
                {step.title}
              </div>
              {step.description && (
                <div className="text-xs text-black dark:text-white opacity-70 mt-0.5 max-w-[200px]">
                  {step.description}
                </div>
              )}
            </div>

            {/* Connector Line */}
            {idx < steps.length - 1 && (
              <div
                className={clsx(
                  isVertical
                    ? 'absolute left-5 top-10 bottom-0 -mb-6 w-0.5 bg-[#CDCDCD] dark:bg-slate-700'
                    : 'hidden sm:block flex-1 h-0.5 mt-5 bg-[#CDCDCD] dark:bg-slate-700 self-start mx-2',
                  idx < current && 'bg-[#FF644B]'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
