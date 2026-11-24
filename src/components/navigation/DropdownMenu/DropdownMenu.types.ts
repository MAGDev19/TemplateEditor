import type { HTMLAttributes, ReactNode } from 'react';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface DropdownMenuItem {
  key: string;
  label: ReactNode;
  icon?: IconDefinition;
  danger?: boolean;
  disabled?: boolean;
  divider?: boolean;
}

export interface DropdownMenuProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  trigger: ReactNode;
  items: DropdownMenuItem[];
  placement?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  onSelect?: (key: string) => void;
}
