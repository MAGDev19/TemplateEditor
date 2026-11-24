import type { HTMLAttributes, ReactNode } from 'react';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface NavItem {
  key: string;
  label: ReactNode;
  href?: string;
  icon?: IconDefinition;
  active?: boolean;
  disabled?: boolean;
  children?: NavItem[];
}

export interface NavbarProps extends Omit<HTMLAttributes<HTMLElement>, 'onSelect'> {
  brand?: ReactNode;
  items?: NavItem[];
  actions?: ReactNode;
  activeKey?: string;
  onSelect?: (key: string) => void;
  sticky?: boolean;
  transparent?: boolean;
}
