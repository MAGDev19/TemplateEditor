import clsx from 'clsx';
import Icon from '../../base/Icon';
import type { SidebarProps } from './Sidebar.types';

export const Sidebar = ({
  items,
  activeKey,
  onSelect,
  isOpen = true,
  className,
}: SidebarProps) => {
  return (
    <aside
      className={clsx(
        'w-64 bg-white dark:bg-slate-800 border-r border-[#CDCDCD] dark:border-slate-700 flex flex-col p-4 transition-all duration-200 h-[calc(100vh-4rem)] sticky top-16 shrink-0',
        !isOpen && '-translate-x-full !w-0 p-0 overflow-hidden',
        className
      )}
    >
      <ul className="flex flex-col gap-1.5 list-none p-0 m-0">
        {items.map((item) => {
          const isActive = activeKey ? activeKey === item.key : item.active;
          return (
            <li key={item.key}>
              <a
                href={item.href || '#'}
                className={clsx(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 no-underline',
                  isActive
                    ? 'bg-[#FFF0ED] dark:bg-slate-700 text-[#FF644B] dark:text-[#FF644B] border-l-4 border-[#FF644B] shadow-xs'
                    : 'text-black dark:text-white hover:bg-[#EBEBEB] dark:hover:bg-slate-700/60'
                )}
                onClick={(e) => {
                  if (onSelect) {
                    e.preventDefault();
                    onSelect(item.key);
                  }
                }}
              >
                {item.icon && <Icon icon={item.icon} className={isActive ? 'text-[#FF644B]' : 'text-black dark:text-white'} />}
                <span>{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
