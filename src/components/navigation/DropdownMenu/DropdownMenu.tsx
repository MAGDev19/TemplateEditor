import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { DropdownMenuProps } from './DropdownMenu.types';

export const DropdownMenu = ({
  trigger,
  items,
  placement = 'bottom-left',
  onSelect,
  className,
  ...props
}: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (key: string, disabled?: boolean) => {
    if (disabled) return;
    if (onSelect) {
      onSelect(key);
    }
    setIsOpen(false);
  };

  const placementClasses = {
    'bottom-left': 'top-full left-0 mt-2',
    'bottom-right': 'top-full right-0 mt-2',
    'top-left': 'bottom-full left-0 mb-2',
    'top-right': 'bottom-full right-0 mb-2',
  };

  return (
    <div className={clsx('relative inline-block text-left', className)} ref={menuRef} {...props}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          className={clsx(
            'absolute z-50 w-56 rounded-xl bg-white dark:bg-slate-800 border border-[#CDCDCD] dark:border-slate-700/80 shadow-xl py-1 focus:outline-none transition-all duration-150 animate-in fade-in zoom-in-95',
            placementClasses[placement]
          )}
        >
          {items.map((item) => {
            if (item.divider) {
              return <div key={item.key} className="my-1 border-t border-[#CDCDCD] dark:border-slate-700/60" />;
            }

            return (
              <button
                key={item.key}
                type="button"
                disabled={item.disabled}
                onClick={() => handleSelect(item.key, item.disabled)}
                className={clsx(
                  'w-full text-left flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors cursor-pointer bg-transparent border-0',
                  item.danger
                    ? 'text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 font-semibold'
                    : 'text-black dark:text-white hover:bg-[#EBEBEB] dark:hover:bg-slate-700/60 font-semibold',
                  item.disabled && 'opacity-40 cursor-not-allowed'
                )}
              >
                {item.icon && <FontAwesomeIcon icon={item.icon} className="text-xs" />}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
