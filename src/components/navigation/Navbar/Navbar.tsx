import { useState } from 'react';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import type { NavbarProps, NavItem } from './Navbar.types';

export const Navbar = ({
  brand,
  items = [],
  actions,
  activeKey,
  onSelect,
  sticky = false,
  transparent = false,
  className,
  ...props
}: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdownKey, setOpenDropdownKey] = useState<string | null>(null);

  const handleItemClick = (item: NavItem) => {
    if (item.disabled) return;
    if (onSelect) {
      onSelect(item.key);
    }
    setMobileOpen(false);
  };

  const toggleDropdown = (key: string) => {
    setOpenDropdownKey((prev) => (prev === key ? null : key));
  };

  return (
    <header
      className={clsx(
        'w-full transition-colors duration-200 z-40',
        sticky && 'sticky top-0 shadow-sm backdrop-blur-md',
        transparent
          ? 'bg-transparent text-white'
          : 'bg-white dark:bg-slate-900 border-b border-[#CDCDCD] dark:border-slate-800 text-black dark:text-white',
        className
      )}
      {...props}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo / Title */}
        {brand && <div className="flex-shrink-0 font-bold text-xl flex items-center gap-2">{brand}</div>}

        {/* Desktop Links */}
        {items.length > 0 && (
          <nav className="hidden md:flex items-center gap-1">
            {items.map((item) => {
              const isActive = item.active || item.key === activeKey;
              const hasChildren = item.children && item.children.length > 0;
              const isDropdownOpen = openDropdownKey === item.key;

              if (hasChildren) {
                return (
                  <div key={item.key} className="relative group">
                    <button
                      type="button"
                      onClick={() => toggleDropdown(item.key)}
                      className={clsx(
                        'flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer bg-transparent',
                        isActive
                          ? 'text-[#FF644B] bg-[#FFF0ED] dark:bg-slate-800'
                          : 'text-black dark:text-white hover:bg-[#EBEBEB] dark:hover:bg-slate-800'
                      )}
                    >
                      {item.icon && <FontAwesomeIcon icon={item.icon} className="text-xs" />}
                      <span>{item.label}</span>
                      <FontAwesomeIcon icon={faChevronDown} className="text-[10px] opacity-70" />
                    </button>

                    {/* Submenu Dropdown */}
                    <div
                      className={clsx(
                        'absolute left-0 mt-1 w-48 rounded-xl bg-white dark:bg-slate-800 border border-[#CDCDCD] dark:border-slate-700 shadow-lg py-1 transition-all z-50',
                        isDropdownOpen ? 'block' : 'hidden group-hover:block'
                      )}
                    >
                      {item.children?.map((child) => (
                        <button
                          key={child.key}
                          type="button"
                          onClick={() => handleItemClick(child)}
                          className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-black dark:text-white hover:bg-[#EBEBEB] dark:hover:bg-slate-700/60 transition-colors"
                        >
                          {child.icon && <FontAwesomeIcon icon={child.icon} className="text-xs" />}
                          <span>{child.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => handleItemClick(item)}
                  disabled={item.disabled}
                  className={clsx(
                    'flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer bg-transparent',
                    isActive
                      ? 'text-[#FF644B] bg-[#FFF0ED] dark:bg-slate-800'
                      : 'text-black dark:text-white hover:bg-[#EBEBEB] dark:hover:bg-slate-800',
                    item.disabled && 'opacity-40 cursor-not-allowed'
                  )}
                >
                  {item.icon && <FontAwesomeIcon icon={item.icon} className="text-xs" />}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        )}

        {/* Actions Slot */}
        {actions && <div className="hidden md:flex items-center gap-3">{actions}</div>}

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          {actions && <div className="flex items-center gap-1 mr-2">{actions}</div>}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-lg text-black dark:text-white hover:bg-[#EBEBEB] dark:hover:bg-slate-800 focus:outline-none"
          >
            <FontAwesomeIcon icon={mobileOpen ? faTimes : faBars} className="text-lg" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#CDCDCD] dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-5 space-y-1">
          {items.map((item) => {
            const isActive = item.active || item.key === activeKey;
            return (
              <div key={item.key}>
                <button
                  type="button"
                  onClick={() => handleItemClick(item)}
                  className={clsx(
                    'w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-semibold transition-colors text-left',
                    isActive
                      ? 'bg-[#FFF0ED] text-[#FF644B] dark:bg-slate-800'
                      : 'text-black dark:text-white hover:bg-[#EBEBEB] dark:hover:bg-slate-800'
                  )}
                >
                  <div className="flex items-center gap-2">
                    {item.icon && <FontAwesomeIcon icon={item.icon} className="text-sm" />}
                    <span>{item.label}</span>
                  </div>
                </button>
                {item.children && (
                  <div className="pl-6 space-y-1 mt-1">
                    {item.children.map((child) => (
                      <button
                        key={child.key}
                        type="button"
                        onClick={() => handleItemClick(child)}
                        className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-black dark:text-white hover:bg-[#EBEBEB]"
                      >
                        {child.icon && <FontAwesomeIcon icon={child.icon} className="text-xs" />}
                        <span>{child.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </header>
  );
};

export default Navbar;
