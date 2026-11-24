/**
 * Servicio centralizado de registro de eventos y errores (Telemetry / Logger).
 * Preparado para integración con Sentry, LogRocket, Datadog u OpenTelemetry.
 */

export interface LogPayload {
  message: string;
  context?: Record<string, unknown>;
  error?: Error | unknown;
}

class LoggerService {
  private isDevelopment = import.meta.env.DEV;

  /**
   * Registra un error crítico y lo reporta al servicio de telemetría en producción.
   */
  public logError({ message, context, error }: LogPayload): void {
    if (this.isDevelopment) {
      console.error(`[LOGGER ERROR] ${message}`, { context, error });
    } else {
      // TODO: Integración con Sentry / LogRocket
      // Sentry.captureException(error, { extra: { message, ...context } });
    }
  }

  /**
   * Registra una advertencia no bloqueante.
   */
  public logWarning({ message, context }: Omit<LogPayload, 'error'>): void {
    if (this.isDevelopment) {
      console.warn(`[LOGGER WARN] ${message}`, context);
    }
  }

  /**
   * Registra información de auditoría o métricas de uso.
   */
  public logInfo({ message, context }: Omit<LogPayload, 'error'>): void {
    if (this.isDevelopment) {
      console.info(`[LOGGER INFO] ${message}`, context);
    }
  }
}

export const logger = new LoggerService();
export default logger;
