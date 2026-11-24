export type LoaderSize = 'sm' | 'md' | 'lg' | 'xl';
export type LoaderVariant = 'primary' | 'secondary' | 'light';

export interface SpinnerProps {
  size?: LoaderSize;
  variant?: LoaderVariant;
  className?: string;
}

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  className?: string;
}
