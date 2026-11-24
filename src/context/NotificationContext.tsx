import { createContext, useContext, useState, type ReactNode } from 'react';

export interface SystemNotification {
  id: string;
  title: string;
  description: string;
  details: string;
  category: 'Sistema' | 'Seguridad' | 'Usuarios' | 'Finanzas';
  type: 'info' | 'success' | 'warning' | 'danger';
  priority: 'Alta' | 'Media' | 'Baja';
  time: string;
  timestamp: string;
  ipAddress?: string;
  read: boolean;
}

interface NotificationContextType {
  notifications: SystemNotification[];
  unreadCount: number;
  markAllAsRead: () => void;
  toggleRead: (id: string) => void;
  deleteNotification: (id: string) => void;
  clearReadNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<SystemNotification[]>([
    {
      id: 'NOT-1001',
      title: 'Nuevo Usuario Registrado',
      description: 'Carolina Gómez creó una cuenta en la plataforma con rol Frontend Dev.',
      details: 'El registro se completó correctamente mediante la autenticación OAuth2 de la organización. Se asignaron los permisos por defecto.',
      category: 'Usuarios',
      type: 'info',
      priority: 'Media',
      time: 'Hace 5 minutos',
      timestamp: '2026-08-04 12:10:00',
      ipAddress: '190.156.42.12',
      read: false,
    },
    {
      id: 'NOT-1002',
      title: 'Actualización del Sistema v2.0',
      description: 'Se desplegaron los nuevos tokens de diseño UX/UI y tipografía en toda la app.',
      details: 'La compilación de producción finalizó con éxito en 1.89s sin errores de TypeScript. Todos los módulos fueron actualizados.',
      category: 'Sistema',
      type: 'success',
      priority: 'Baja',
      time: 'Hace 1 hora',
      timestamp: '2026-08-04 11:15:00',
      read: false,
    },
    {
      id: 'NOT-1003',
      title: 'Alerta de Seguridad: Acceso IP Inhabitual',
      description: 'Intento de inicio de sesión detectado desde una dirección IP no registrada previamente.',
      details: 'Se detectó una solicitud de inicio de sesión desde la IP 192.168.1.105 (Bogotá, CO). Se solicitó autenticación de doble factor (2FA).',
      category: 'Seguridad',
      type: 'warning',
      priority: 'Alta',
      time: 'Hace 3 horas',
      timestamp: '2026-08-04 09:30:00',
      ipAddress: '192.168.1.105',
      read: false,
    },
    {
      id: 'NOT-1004',
      title: 'Fallo en Conexión Webhook',
      description: 'No se pudo entregar la notificación al servidor externo de pagos.',
      details: 'El endpoint remoto devolvió un código HTTP 504 Gateway Timeout. El trabajo de reintento en segundo plano fue programado.',
      category: 'Sistema',
      type: 'danger',
      priority: 'Alta',
      time: 'Hace 5 horas',
      timestamp: '2026-08-04 07:20:00',
      read: true,
    },
    {
      id: 'NOT-1005',
      title: 'Reporte Financiero Disponible',
      description: 'El resumen consolidado de transacciones mensuales fue generado exitosamente.',
      details: 'El reporte consolidado en formato PDF/Excel está disponible para su descarga en el módulo de contabilidad.',
      category: 'Finanzas',
      type: 'info',
      priority: 'Baja',
      time: 'Hace 1 día',
      timestamp: '2026-08-03 16:45:00',
      read: true,
    },
    {
      id: 'NOT-1006',
      title: 'Cambio de Credenciales de Administrador',
      description: 'El usuario Johan Garzón actualizó su clave de acceso principal.',
      details: 'La clave de acceso del usuario administrador fue restablecida mediante confirmación por correo electrónico cifrado.',
      category: 'Seguridad',
      type: 'warning',
      priority: 'Media',
      time: 'Hace 2 días',
      timestamp: '2026-08-02 14:10:00',
      ipAddress: '186.28.110.8',
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const toggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearReadNotifications = () => {
    setNotifications((prev) => prev.filter((n) => !n.read));
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAllAsRead,
        toggleRead,
        deleteNotification,
        clearReadNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotificationContext debe usarse dentro de un NotificationProvider');
  }
  return context;
};
