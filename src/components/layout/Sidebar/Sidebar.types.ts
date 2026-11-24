import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface SidebarNavItem {
  key: string;
  label: string;
  icon?: IconDefinition;
  href?: string;
  active?: boolean;
}

export interface SidebarProps {
  items: SidebarNavItem[];
  activeKey?: string;
  onSelect?: (key: string) => void;
  isOpen?: boolean;
  className?: string;
}
