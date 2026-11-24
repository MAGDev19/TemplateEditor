import React from 'react';
import type { FallbackProps } from 'react-error-boundary';
import Button from '@/components/base/Button';
import styles from './ErrorBoundaryFallback.module.css';
import logger from '@/services/logger.service';

export const ErrorBoundaryFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  React.useEffect(() => {
    logger.logError({
      message: 'Uncaught UI Exception captured by ErrorBoundary',
      error,
    });
  }, [error]);

  const errorMessage = error instanceof Error ? error.message : String(error ?? 'Error desconocido');

  return (
    <div className={styles.container} role="alert">
      <div className={styles.iconContainer}>⚠️</div>
      <h2 className={styles.title}>¡Algo salió mal!</h2>
      <p className={styles.description}>
        Ha ocurrido un error inesperado en este componente de la aplicación.
      </p>

      {errorMessage && (
        <pre className={styles.errorDetails}>
          <code>{errorMessage}</code>
        </pre>
      )}

      <div className={styles.actions}>
        <Button variant="primary" onClick={resetErrorBoundary}>
          Reintentar
        </Button>
        <Button variant="secondary" outlined onClick={() => window.location.reload()}>
          Recargar página
        </Button>
      </div>
    </div>
  );
};

export default ErrorBoundaryFallback;
