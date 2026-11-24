import logger from '@/services/logger.service';

const STORAGE_PREFIX = 'app_baseline_';

/**
 * Abstracción segura de almacenamiento en localStorage con prefijado y control de excepciones.
 */
export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
      if (!item) return defaultValue;
      return JSON.parse(item) as T;
    } catch (error) {
      logger.logError({ message: `Error leyendo clave '${key}' de localStorage`, error });
      return defaultValue;
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(`${STORAGE_PREFIX}${key}`, serialized);
    } catch (error) {
      logger.logError({ message: `Error guardando clave '${key}' en localStorage`, error });
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
    } catch (error) {
      logger.logError({ message: `Error eliminando clave '${key}' de localStorage`, error });
    }
  },

  clear: (): void => {
    try {
      Object.keys(localStorage).forEach((k) => {
        if (k.startsWith(STORAGE_PREFIX)) {
          localStorage.removeItem(k);
        }
      });
    } catch (error) {
      logger.logError({ message: 'Error limpiando localStorage de la aplicación', error });
    }
  },
};

export default storage;
