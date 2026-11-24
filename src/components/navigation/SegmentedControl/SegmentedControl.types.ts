import type { HTMLAttributes, ReactNode } from 'react';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface SegmentOption {
  label: ReactNode;
  value: string;
  icon?: IconDefinition;
  disabled?: boolean;
}

export interface SegmentedControlProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: SegmentOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}
