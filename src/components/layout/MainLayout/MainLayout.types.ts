import type { ReactNode } from 'react';
import type { SidebarNavItem } from '../Sidebar/Sidebar.types';

export interface MainLayoutProps {
  children: ReactNode;
  sidebarItems?: SidebarNavItem[];
  activeNavKey?: string;
  onSelectNav?: (key: string) => void;
  logo?: ReactNode;
}
