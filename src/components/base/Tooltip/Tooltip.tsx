import clsx from 'clsx';
import type { TooltipProps } from './Tooltip.types';

export const Tooltip = ({ content, children, position = 'top' }: TooltipProps) => {
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 -translate-y-1.5 mb-1',
    bottom: 'top-full left-1/2 -translate-x-1/2 translate-y-1.5 mt-1',
    left: 'right-full top-1/2 -translate-y-1/2 -translate-x-1.5 mr-1',
    right: 'left-full top-1/2 -translate-y-1/2 translate-x-1.5 ml-1',
  };

  return (
    <div className="relative inline-block group">
      {children}
      <div
        className={clsx(
          'absolute z-50 px-2.5 py-1 text-xs font-bold text-white bg-[#666666] dark:bg-slate-700 rounded-md shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none',
          positionClasses[position]
        )}
      >
        {content}
      </div>
    </div>
  );
};

export default Tooltip;
