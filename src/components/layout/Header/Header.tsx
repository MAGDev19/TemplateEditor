import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import {
  faBars,
  faMoon,
  faSun,
  faSignOutAlt,
  faBell,
  faCheckDouble,
  faInfoCircle,
  faExclamationCircle,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../../../hooks/useTheme';
import { useAuth } from '../../../hooks/useAuth';
import { useNotifications } from '../../../hooks/useNotifications';
import { showConfirmDialog, showToastNotification } from '../../../utils';
import Button from '../../base/Button';
import Icon from '../../base/Icon';
import Tooltip from '../../base/Tooltip';
import type { HeaderProps } from './Header.types';

export const Header = ({ logo, onToggleSidebar, className }: HeaderProps) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { notifications, unreadCount, markAllAsRead, toggleRead } = useNotifications();

  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMarkAllRead = () => {
    markAllAsRead();
    showToastNotification('Todas las notificaciones marcadas como leídas', 'success');
  };

  const handleLogout = async () => {
    const confirmed = await showConfirmDialog(
      '¿Cerrar Sesión?',
      '¿Estás seguro de que deseas salir de la aplicación?',
      'Sí, Salir'
    );
    if (confirmed) {
      logout();
      showToastNotification('Sesión cerrada correctamente', 'info');
    }
  };

  return (
    <header className={clsx('h-16 px-6 bg-white dark:bg-slate-800 border-b border-[#CDCDCD] dark:border-slate-700 flex items-center justify-between sticky top-0 z-40 transition-colors duration-200', className)}>
      <div className="flex items-center gap-4">
        {onToggleSidebar && (
          <button
            className="p-2 text-black dark:text-white hover:bg-[#EBEBEB] dark:hover:bg-slate-700 rounded-lg transition-colors"
            onClick={onToggleSidebar}
            aria-label="Toggle Sidebar"
          >
            <Icon icon={faBars} />
          </button>
        )}
        <div className="font-bold text-xl text-[#FF644B] flex items-center gap-2">
          {logo || <span>Vision App</span>}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Theme Switcher */}
        <Tooltip content={theme === 'dark' ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'} position="bottom">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            aria-label="Cambiar Tema"
            leftIcon={<Icon icon={theme === 'dark' ? faSun : faMoon} />}
          >
            {theme === 'dark' ? 'Claro' : 'Oscuro'}
          </Button>
        </Tooltip>

        {/* Notification Center Popover */}
        <div className="relative" ref={notifRef}>
          <Tooltip content={`Notificaciones (${unreadCount} nuevas)`} position="bottom">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowNotifications(!showNotifications)}
              leftIcon={<Icon icon={faBell} />}
            />
          </Tooltip>
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#FF644B] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center pointer-events-none shadow-xs">
              {unreadCount}
            </span>
          )}

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-800 border border-[#CDCDCD] dark:border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between p-4 border-b border-[#CDCDCD] dark:border-slate-700 bg-[#EBEBEB]/40 dark:bg-slate-900/40">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-black dark:text-white">Centro de Notificaciones</h3>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 text-xs font-bold bg-[#FF644B] text-white rounded-full">
                      {unreadCount} nuevas
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="text-xs text-[#FF644B] hover:underline font-bold flex items-center gap-1 cursor-pointer bg-transparent border-0"
                  >
                    <Icon icon={faCheckDouble} /> Leídas
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-[#CDCDCD]/50 dark:divide-slate-700">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-black dark:text-white opacity-70">
                    No tienes notificaciones pendientes.
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        if (!n.read) toggleRead(n.id);
                        showToastNotification(`Notificación: "${n.title}"`, 'info');
                      }}
                      className={clsx(
                        'p-3.5 flex gap-3 items-start transition-colors cursor-pointer hover:bg-[#FFF0ED]/40 dark:hover:bg-slate-700/80',
                        n.read ? 'bg-white dark:bg-slate-800' : 'bg-[#FFF0ED]/60 dark:bg-slate-700/60'
                      )}
                    >
                      <div className={clsx(
                        'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5',
                        n.type === 'info' && 'bg-[#FFF0ED] text-[#FF644B]',
                        n.type === 'success' && 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-300',
                        n.type === 'warning' && 'bg-amber-100 text-amber-600 dark:bg-amber-950/60 dark:text-amber-300'
                      )}>
                        <Icon icon={n.type === 'info' ? faInfoCircle : n.type === 'success' ? faCheckCircle : faExclamationCircle} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="text-xs font-bold text-black dark:text-white">{n.title}</h4>
                          <span className="text-[10px] text-black dark:text-white opacity-60 font-medium shrink-0">{n.time}</span>
                        </div>
                        <p className="text-xs text-black dark:text-white opacity-80 mt-0.5 leading-snug">{n.description}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-2.5 text-center border-t border-[#CDCDCD] dark:border-slate-700 bg-white dark:bg-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setShowNotifications(false);
                    navigate('/notifications');
                  }}
                  className="text-xs font-bold text-[#FF644B] hover:underline cursor-pointer bg-transparent border-0 w-full"
                >
                  Ver todas las notificaciones en el sistema
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Badge & Logout */}
        {user && (
          <div className="flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-700/60 border border-[#CDCDCD] dark:border-slate-700 shadow-xs">
            {user.avatar && <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover ring-2 ring-[#FF644B]" />}
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-bold text-black dark:text-white">{user.name}</span>
              <span className="text-[11px] text-[#666666] dark:text-slate-400">{user.role || 'Usuario'}</span>
            </div>
            <Tooltip content="Cerrar Sesión" position="bottom">
              <Button
                variant="ghost"
                size="xs"
                onClick={handleLogout}
                leftIcon={<Icon icon={faSignOutAlt} />}
              />
            </Tooltip>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
