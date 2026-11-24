import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Spinner from '@/components/base/Loader';

// Lazy loading de vistas para optimización de carga inicial y code splitting
const ShowcaseView = lazy(() => import('@/views/ShowcaseView'));
const LoginView = lazy(() => import('@/views/LoginView'));
const NotFoundView = lazy(() => import('@/views/NotFoundView'));
const UsersView = lazy(() => import('@/features/users/views/UsersView'));
const NotificationsView = lazy(() => import('@/views/NotificationsView'));

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const PublicOnlyRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Spinner size="lg" />
            <span style={{ marginLeft: '0.75rem', color: '#64748b' }}>Cargando módulo...</span>
          </div>
        }
      >
        <Routes>
          {/* Ruta Pública de Login */}
          <Route
            path="/login"
            element={
              <PublicOnlyRoute>
                <LoginView />
              </PublicOnlyRoute>
            }
          />

          {/* Rutas Protegidas */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ShowcaseView />
              </ProtectedRoute>
            }
          />

          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <UsersView />
              </ProtectedRoute>
            }
          />

          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <NotificationsView />
              </ProtectedRoute>
            }
          />

          {/* Ruta 404 Not Found */}
          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;
