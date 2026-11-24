import { useState } from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import type { MainLayoutProps } from './MainLayout.types';

export const MainLayout = ({
  children,
  sidebarItems = [],
  activeNavKey,
  onSelectNav,
  logo,
}: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex flex-col bg-[#EBEBEB] dark:bg-slate-900 text-[#1F1F1F] dark:text-slate-100 transition-colors duration-200">
      <Header
        logo={logo}
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
      />

      <div className="flex flex-1">
        {sidebarItems.length > 0 && (
          <Sidebar
            items={sidebarItems}
            activeKey={activeNavKey}
            onSelect={onSelectNav}
            isOpen={sidebarOpen}
          />
        )}

        <main className="flex-1 p-8 overflow-y-auto flex flex-col min-w-0">
          {children}
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
