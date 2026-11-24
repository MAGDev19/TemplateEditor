import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import AppRoutes from './routes/AppRoutes';
import { queryClient } from './config/queryClient';
import { ErrorBoundaryFallback } from './components/feedback/ErrorBoundaryFallback';
import { useOnlineStatus } from './hooks/useOnlineStatus';

function OfflineBanner() {
  const isOnline = useOnlineStatus();
  if (isOnline) return null;

  return (
    <div
      style={{
        backgroundColor: '#ef4444',
        color: '#ffffff',
        textAlign: 'center',
        padding: '0.5rem',
        fontSize: '0.875rem',
        fontWeight: 600,
        position: 'sticky',
        top: 0,
        zIndex: 9999,
      }}
    >
      ⚠️ Sin conexión a Internet. Operando en modo fuera de línea.
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <NotificationProvider>
              <OfflineBanner />
              <AppRoutes />
            </NotificationProvider>
          </AuthProvider>
        </ThemeProvider>
        {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;