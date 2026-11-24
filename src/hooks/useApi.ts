import { useState, useCallback, useEffect } from 'react';
import { api } from '../utils/api';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useApi<T>(fetchFn?: () => Promise<T>, immediate = true) {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: immediate,
    error: null,
  });

  const execute = useCallback(
    async (fn?: () => Promise<T>) => {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const targetFn = fn || fetchFn;
        if (!targetFn) throw new Error('No fetch function provided');
        const result = await targetFn();
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('An error occurred');
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    [fetchFn]
  );

  useEffect(() => {
    if (immediate && fetchFn) {
      execute();
    }
  }, [immediate, fetchFn, execute]);

  return { ...state, execute, api };
}
