import clsx from 'clsx';
import type { SpinnerProps, SkeletonProps } from './Loader.types';

export const Spinner = ({ size = 'md', variant = 'primary', className }: SpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-7 h-7 border-3',
    lg: 'w-10 h-10 border-4',
    xl: 'w-14 h-14 border-4',
  };

  const variantClasses = {
    primary: 'border-[#FF644B] border-t-transparent',
    secondary: 'border-[#666666] border-t-transparent',
    light: 'border-white border-t-transparent',
  };

  return (
    <div
      className={clsx(
        'inline-block rounded-full animate-spin border-solid',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      role="status"
      aria-label="Cargando..."
    />
  );
};

export const Skeleton = ({
  width = '100%',
  height = '1rem',
  borderRadius,
  className,
}: SkeletonProps) => {
  return (
    <div
      className={clsx('animate-pulse bg-[#EBEBEB] dark:bg-slate-700 rounded-md', className)}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius: borderRadius || undefined,
      }}
    />
  );
};

export default Object.assign(Spinner, {
  Spinner,
  Skeleton,
});
