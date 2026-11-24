import type { HTMLAttributes, ReactNode } from 'react';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface StepItem {
  title: ReactNode;
  description?: ReactNode;
  icon?: IconDefinition;
  status?: 'wait' | 'process' | 'finish' | 'error';
  disabled?: boolean;
}

export interface StepperProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  steps: StepItem[];
  current?: number;
  direction?: 'horizontal' | 'vertical';
  variant?: 'default' | 'dots' | 'numbers';
  onChange?: (stepIndex: number) => void;
}
