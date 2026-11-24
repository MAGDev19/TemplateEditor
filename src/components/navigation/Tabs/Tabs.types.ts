import type { ReactNode } from 'react';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type TabVariant = 'line' | 'pills' | 'segmented' | 'contained' | 'underline';
export type TabSize = 'sm' | 'md' | 'lg';
export type TabOrientation = 'horizontal' | 'vertical';

export interface TabItem {
  key: string;
  label: ReactNode;
  content?: ReactNode;
  icon?: IconDefinition;
  badge?: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  defaultActiveKey?: string;
  activeKey?: string;
  variant?: TabVariant;
  size?: TabSize;
  orientation?: TabOrientation;
  fullWidth?: boolean;
  onChange?: (key: string) => void;
  className?: string;
  contentClassName?: string;
}
