import type { ReactNode } from 'react';

export interface HeaderProps {
  logo?: ReactNode;
  onToggleSidebar?: () => void;
  className?: string;
}
