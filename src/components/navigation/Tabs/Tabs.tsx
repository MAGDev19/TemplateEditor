import { useState } from 'react';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { TabsProps } from './Tabs.types';

export const Tabs = ({
  items,
  defaultActiveKey,
  activeKey: controlledActiveKey,
  variant = 'line',
  size = 'md',
  orientation = 'horizontal',
  fullWidth = false,
  onChange,
  className,
  contentClassName,
}: TabsProps) => {
  const [internalActiveKey, setInternalActiveKey] = useState(
    defaultActiveKey || (items.length > 0 ? items[0].key : '')
  );

  const activeKey = controlledActiveKey !== undefined ? controlledActiveKey : internalActiveKey;

  const handleTabClick = (key: string, disabled?: boolean) => {
    if (disabled) return;
    if (controlledActiveKey === undefined) {
      setInternalActiveKey(key);
    }
    if (onChange) {
      onChange(key);
    }
  };

  const activeTabContent = items.find((item) => item.key === activeKey)?.content;

  // Size styling classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs font-medium gap-1.5',
    md: 'px-4 py-2.5 text-sm font-medium gap-2',
    lg: 'px-6 py-3.5 text-base font-semibold gap-2.5',
  };

  // Orientation container layout
  const isVertical = orientation === 'vertical';

  // Variant list styles
  const listVariantClasses = {
    line: isVertical ? 'flex-col border-r border-slate-200 dark:border-slate-700' : 'border-b border-slate-200 dark:border-slate-700',
    pills: 'gap-1.5 bg-transparent',
    segmented: 'p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200/60 dark:border-slate-700/60 shadow-inner',
    contained: 'bg-slate-50 dark:bg-slate-900/60 p-1.5 rounded-t-xl border border-slate-200 dark:border-slate-700 border-b-0',
    underline: isVertical ? 'flex-col border-r border-slate-200 dark:border-slate-700' : 'border-b-2 border-slate-100 dark:border-slate-800',
  };

  return (
    <div
      className={clsx(
        'w-full',
        isVertical ? 'flex flex-row gap-6' : 'flex flex-col',
        className
      )}
    >
      <ul
        className={clsx(
          'flex list-none p-0 m-0 select-none overflow-x-auto no-scrollbar',
          isVertical ? 'flex-col min-w-[200px]' : 'flex-row items-center',
          listVariantClasses[variant]
        )}
        role="tablist"
      >
        {items.map((tab) => {
          const isActive = tab.key === activeKey;

          // Variant button styles
          let buttonStyle = '';
          if (variant === 'line') {
            buttonStyle = isVertical
              ? clsx(
                  'border-r-2 text-left w-full rounded-l-md transition-all',
                  isActive
                    ? 'border-[#FF644B] text-[#FF644B] bg-[#FFF0ED] dark:bg-slate-800/50 font-bold'
                    : 'border-transparent text-black dark:text-white hover:bg-[#EBEBEB] dark:hover:bg-slate-800/50'
                )
              : clsx(
                  'border-b-2 transition-all',
                  isActive
                    ? 'border-[#FF644B] text-[#FF644B] font-bold'
                    : 'border-transparent text-black dark:text-white hover:text-[#FF644B]'
                );
          } else if (variant === 'pills') {
            buttonStyle = clsx(
              'rounded-lg transition-all',
              isActive
                ? 'bg-[#FF644B] !text-white shadow-md font-bold'
                : 'text-black dark:text-white hover:bg-[#EBEBEB] dark:hover:bg-slate-800'
            );
          } else if (variant === 'segmented') {
            buttonStyle = clsx(
              'rounded-lg transition-all duration-200',
              isActive
                ? 'bg-[#FF644B] !text-white shadow-sm font-bold'
                : 'text-black dark:text-white hover:bg-[#EBEBEB]'
            );
          } else if (variant === 'contained') {
            buttonStyle = clsx(
              'rounded-t-lg transition-all border border-transparent',
              isActive
                ? 'bg-white dark:bg-slate-800 text-[#FF644B] font-bold border-[#CDCDCD] dark:border-slate-700 shadow-sm'
                : 'text-black dark:text-white hover:bg-[#EBEBEB]'
            );
          } else if (variant === 'underline') {
            buttonStyle = clsx(
              'relative transition-all',
              isActive
                ? 'text-[#FF644B] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#FF644B] after:rounded-full'
                : 'text-black dark:text-white hover:text-[#FF644B]'
            );
          }

          return (
            <li
              key={tab.key}
              role="presentation"
              className={clsx(fullWidth && !isVertical && 'flex-1')}
            >
              <button
                role="tab"
                type="button"
                aria-selected={isActive}
                disabled={tab.disabled}
                className={clsx(
                  'flex items-center justify-center transition-all duration-150 cursor-pointer bg-transparent w-full',
                  sizeClasses[size],
                  buttonStyle,
                  tab.disabled && 'opacity-40 cursor-not-allowed pointer-events-none'
                )}
                onClick={() => handleTabClick(tab.key, tab.disabled)}
              >
                {tab.icon && <FontAwesomeIcon icon={tab.icon} className="text-sm" />}
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge !== null && (
                  <span
                    className={clsx(
                      'ml-1 px-1.5 py-0.5 text-[10px] font-bold rounded-full leading-none',
                      isActive
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200'
                        : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                    )}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {activeTabContent && (
        <div className={clsx(isVertical ? 'flex-1' : 'py-5', contentClassName)}>
          {activeTabContent}
        </div>
      )}
    </div>
  );
};

export default Tabs;
