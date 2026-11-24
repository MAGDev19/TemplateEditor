import React from 'react';
import { useNavigate } from 'react-router-dom';
import { faLayerGroup, faUsers, faBell } from '@fortawesome/free-solid-svg-icons';
import { MainLayout } from '@/components/layout';
import { Breadcrumb } from '@/components/navigation';
import UserList from '../components/UserList';

export const UsersView: React.FC = () => {
  const navigate = useNavigate();

  const sidebarItems = [
    { key: 'showcase', label: 'Componentes Base', icon: faLayerGroup },
    { key: 'users', label: 'Módulo Users (DDD + Zod)', icon: faUsers },
    { key: 'notifications', label: 'Centro Notificaciones', icon: faBell },
  ];

  return (
    <MainLayout
      sidebarItems={sidebarItems}
      activeNavKey="users"
      onSelectNav={(key) => {
        if (key === 'showcase') navigate('/');
        if (key === 'notifications') navigate('/notifications');
      }}
      logo={
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-8 h-8 rounded-lg bg-[#FF644B] flex items-center justify-center text-white font-bold text-lg shadow-md">
            V
          </div>
          <span className="text-xl font-bold text-black dark:text-white">Vision React Architecture</span>
        </div>
      }
    >
      <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
        <div>
          <Breadcrumb
            items={[
              { label: 'Inicio', href: '/' },
              { label: 'Módulos Empresariales', href: '#' },
              { label: 'Gestión de Usuarios (DDD + Zod)' },
            ]}
          />
          <div className="mt-2">
            <h1 className="text-2xl font-bold text-black dark:text-white">
              Módulo de Gestión de Usuarios
            </h1>
            <p className="text-sm text-black dark:text-white opacity-80 mt-1">
              Demostración de Feature Architecture (DDD), TanStack Query v5, React Hook Form y Zod Validation.
            </p>
          </div>
        </div>

        <UserList />
      </div>
    </MainLayout>
  );
};

export default UsersView;
