import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faCheckDouble,
  faTrash,
  faSearch,
  faInfoCircle,
  faCheckCircle,
  faExclamationTriangle,
  faShieldAlt,
  faUser,
  faEye,
  faLayerGroup,
  faFilter,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import MainLayout from '@/components/layout/MainLayout';
import { Card, StatCard, Button, Input, Modal } from '@/components/base';
import SegmentedControl from '@/components/navigation/SegmentedControl';
import Breadcrumb from '@/components/navigation/Breadcrumb';
import { showToastNotification } from '@/utils';
import { useNotifications } from '@/hooks/useNotifications';
import type { SystemNotification } from '@/context/NotificationContext';

export const NotificationsView = () => {
  const navigate = useNavigate();
  const {
    notifications,
    unreadCount,
    markAllAsRead,
    toggleRead,
    deleteNotification,
    clearReadNotifications,
  } = useNotifications();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedNotif, setSelectedNotif] = useState<SystemNotification | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Filtered Notifications logic
  const filteredNotifications = notifications.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (filterCategory === 'unread') return !item.read;
    if (filterCategory === 'sistema') return item.category === 'Sistema';
    if (filterCategory === 'seguridad') return item.category === 'Seguridad';
    if (filterCategory === 'usuarios') return item.category === 'Usuarios';

    return true;
  });

  const highPriorityCount = notifications.filter((n) => n.priority === 'Alta').length;
  const readCount = notifications.filter((n) => n.read).length;

  const handleMarkAllRead = () => {
    markAllAsRead();
    showToastNotification('Todas las notificaciones marcadas como leídas', 'success');
  };

  const handleClearRead = () => {
    clearReadNotifications();
    showToastNotification('Se eliminaron las notificaciones leídas del historial', 'info');
  };

  const handleToggleRead = (id: string) => {
    toggleRead(id);
  };

  const handleDeleteNotif = (id: string) => {
    deleteNotification(id);
    showToastNotification('Notificación eliminada', 'info');
  };

  const sidebarItems = [
    { key: 'showcase', label: 'Componentes Base', icon: faLayerGroup, href: '/' },
    { key: 'users', label: 'Gestión de Usuarios', icon: faUser, href: '/users' },
    { key: 'notifications', label: 'Centro Notificaciones', icon: faBell, active: true },
  ];

  return (
    <MainLayout
      activeNavKey="notifications"
      sidebarItems={sidebarItems}
      onSelectNav={(key) => {
        if (key === 'showcase') navigate('/');
        if (key === 'users') navigate('/users');
      }}
    >
      <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
        {/* Header & Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Breadcrumb
              items={[
                { label: 'Inicio', href: '/' },
                { label: 'Centro de Notificaciones' },
              ]}
              className="mb-2"
            />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFF0ED] dark:bg-slate-800 border border-[#CDCDCD] flex items-center justify-center text-[#FF644B]">
                <FontAwesomeIcon icon={faBell} className="text-lg" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-black dark:text-white tracking-tight">
                  Centro de Notificaciones del Sistema
                </h1>
                <p className="text-xs text-black dark:text-white opacity-80 mt-0.5">
                  Visualiza, gestiona e inspecciona los eventos, alertas e historial de la plataforma.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-center">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate('/')}
              leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}
            >
              Volver al Inicio
            </Button>
            {unreadCount > 0 && (
              <Button
                variant="primary"
                size="sm"
                onClick={handleMarkAllRead}
                leftIcon={<FontAwesomeIcon icon={faCheckDouble} />}
              >
                Marcar todas leídas
              </Button>
            )}
          </div>
        </div>

        {/* KPI Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Notificaciones"
            value={notifications.length.toString()}
            icon={faBell}
            footerText="Historial guardado en caché"
            variant="default"
          />
          <StatCard
            title="Sin Leer"
            value={unreadCount.toString()}
            icon={faInfoCircle}
            trend={{ value: `${unreadCount} pendientes`, direction: unreadCount > 0 ? 'up' : 'down' }}
            footerText="Requieren tu atención"
            variant="elevated"
          />
          <StatCard
            title="Prioridad Alta"
            value={highPriorityCount.toString()}
            icon={faExclamationTriangle}
            footerText="Alertas críticas de seguridad"
            variant="glass"
          />
          <StatCard
            title="Atendidas / Leídas"
            value={readCount.toString()}
            icon={faCheckCircle}
            trend={{ value: `${Math.round((readCount / (notifications.length || 1)) * 100)}%`, direction: 'up' }}
            footerText="Procesadas correctamente"
            variant="default"
          />
        </div>

        {/* Controls, Search & Filter Bar */}
        <Card padding="md">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="w-full md:w-80">
              <Input
                placeholder="Buscar por palabra clave..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<FontAwesomeIcon icon={faSearch} />}
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              <SegmentedControl
                value={filterCategory}
                onChange={setFilterCategory}
                size="sm"
                options={[
                  { label: 'Todas', value: 'all' },
                  { label: `Sin Leer (${unreadCount})`, value: 'unread' },
                  { label: 'Sistema', value: 'sistema' },
                  { label: 'Seguridad', value: 'seguridad' },
                  { label: 'Usuarios', value: 'usuarios' },
                ]}
              />

              {readCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearRead}
                  leftIcon={<FontAwesomeIcon icon={faTrash} />}
                >
                  Limpiar Leídas
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Notifications Feed List */}
        <Card padding="none" className="overflow-hidden">
          <div className="p-4 border-b border-[#CDCDCD] dark:border-slate-700 bg-[#EBEBEB]/60 dark:bg-slate-800/80 flex items-center justify-between">
            <h3 className="font-bold text-sm text-black dark:text-white flex items-center gap-2">
              <FontAwesomeIcon icon={faFilter} className="text-[#FF644B]" />
              Listado de Eventos ({filteredNotifications.length})
            </h3>
            <span className="text-xs text-black dark:text-white opacity-70">
              Mostrando notificaciones de la sesión actual
            </span>
          </div>

          <div className="divide-y divide-[#CDCDCD] dark:divide-slate-700">
            {filteredNotifications.length === 0 ? (
              <div className="p-12 text-center flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#EBEBEB] dark:bg-slate-700 flex items-center justify-center text-black dark:text-white opacity-50">
                  <FontAwesomeIcon icon={faBell} className="text-xl" />
                </div>
                <h4 className="font-bold text-black dark:text-white text-sm">No se encontraron notificaciones</h4>
                <p className="text-xs text-black dark:text-white opacity-70 max-w-sm">
                  Prueba cambiando la palabra de búsqueda o seleccionando otra categoría en los filtros superiores.
                </p>
              </div>
            ) : (
              filteredNotifications.map((item) => (
                <div
                  key={item.id}
                  className={clsx(
                    'p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors',
                    item.read
                      ? 'bg-white dark:bg-slate-800'
                      : 'bg-[#FFF0ED]/50 dark:bg-slate-700/50 border-l-4 border-[#FF644B]'
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={clsx(
                        'w-11 h-11 rounded-2xl flex items-center justify-center text-base font-bold shrink-0 mt-0.5 shadow-xs',
                        item.type === 'info' && 'bg-[#FFF0ED] text-[#FF644B] border border-[#FF644B]/30',
                        item.type === 'success' && 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300',
                        item.type === 'warning' && 'bg-amber-100 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300',
                        item.type === 'danger' && 'bg-red-100 text-red-700 dark:bg-red-950/80 dark:text-red-300 border border-red-300'
                      )}
                    >
                      <FontAwesomeIcon
                        icon={
                          item.category === 'Seguridad'
                            ? faShieldAlt
                            : item.category === 'Usuarios'
                            ? faUser
                            : item.type === 'success'
                            ? faCheckCircle
                            : item.type === 'warning' || item.type === 'danger'
                            ? faExclamationTriangle
                            : faInfoCircle
                        }
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-bold text-sm text-black dark:text-white">{item.title}</h4>

                        {/* Category Badge */}
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#EBEBEB] dark:bg-slate-700 text-black dark:text-white border border-[#CDCDCD]">
                          {item.category}
                        </span>

                        {/* Priority Badge */}
                        <span
                          className={clsx(
                            'px-2 py-0.5 rounded-md text-[10px] font-bold',
                            item.priority === 'Alta' && 'bg-[#FF644B] text-white',
                            item.priority === 'Media' && 'bg-amber-500 text-white',
                            item.priority === 'Baja' && 'bg-slate-300 text-slate-800 dark:bg-slate-700 dark:text-slate-200'
                          )}
                        >
                          {item.priority}
                        </span>

                        {!item.read && (
                          <span className="w-2 h-2 rounded-full bg-[#FF644B] animate-pulse" />
                        )}
                      </div>

                      <p className="text-xs text-black dark:text-white opacity-85 leading-relaxed max-w-2xl">
                        {item.description}
                      </p>

                      <div className="flex items-center gap-3 pt-1 text-[11px] text-black dark:text-white opacity-60">
                        <span>ID: <strong>{item.id}</strong></span>
                        <span>•</span>
                        <span>{item.time}</span>
                        {item.ipAddress && (
                          <>
                            <span>•</span>
                            <span>IP: <strong>{item.ipAddress}</strong></span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <Button
                      variant="secondary"
                      size="xs"
                      onClick={() => {
                        setSelectedNotif(item);
                        setIsDetailOpen(true);
                      }}
                      leftIcon={<FontAwesomeIcon icon={faEye} />}
                    >
                      Detalle
                    </Button>

                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => handleToggleRead(item.id)}
                    >
                      {item.read ? 'Marcar No Leída' : 'Marcar Leída'}
                    </Button>

                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => handleDeleteNotif(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* Notification Detail Modal */}
      {selectedNotif && (
        <Modal
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          title={`Detalle de Notificación: ${selectedNotif.id}`}
          size="md"
          footer={
            <>
              <Button
                variant="ghost"
                onClick={() => {
                  handleDeleteNotif(selectedNotif.id);
                  setIsDetailOpen(false);
                }}
              >
                Eliminar Registro
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  handleToggleRead(selectedNotif.id);
                  setIsDetailOpen(false);
                }}
              >
                {selectedNotif.read ? 'Marcar como No Leída' : 'Marcar como Leída'}
              </Button>
            </>
          }
        >
          <div className="flex flex-col gap-4">
            <div className="p-4 rounded-xl bg-[#FFF0ED]/40 dark:bg-slate-800 border border-[#CDCDCD] dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#FF644B] uppercase tracking-wider">
                  {selectedNotif.category} • Prioridad {selectedNotif.priority}
                </span>
                <span className="text-xs text-black dark:text-white opacity-70">
                  {selectedNotif.timestamp}
                </span>
              </div>
              <h3 className="text-base font-extrabold text-black dark:text-white">
                {selectedNotif.title}
              </h3>
              <p className="text-xs text-black dark:text-white opacity-90 leading-relaxed">
                {selectedNotif.description}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-black dark:text-white uppercase tracking-wider">
                Información Técnica Extendida
              </h4>
              <div className="p-3 bg-slate-900 text-slate-200 font-mono text-[11px] rounded-xl overflow-x-auto leading-relaxed border border-slate-800">
                <div>Event ID: {selectedNotif.id}</div>
                <div>Timestamp: {selectedNotif.timestamp}</div>
                <div>Categoría: {selectedNotif.category}</div>
                <div>Estado de Lectura: {selectedNotif.read ? 'LEÍDA' : 'NO LEÍDA'}</div>
                {selectedNotif.ipAddress && <div>Origen IP: {selectedNotif.ipAddress}</div>}
                <div className="mt-2 text-slate-400">// Detalles del evento:</div>
                <div className="text-emerald-300">{selectedNotif.details}</div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </MainLayout>
  );
};

export default NotificationsView;
