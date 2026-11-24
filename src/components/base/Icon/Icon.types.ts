import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface IconProps {
  icon: IconDefinition;
  size?: 'xs' | 'sm' | 'lg' | '1x' | '2x' | '3x';
  className?: string;
  color?: string;
  spin?: boolean;
}
