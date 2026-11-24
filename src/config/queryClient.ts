import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos de caché antes de considerar los datos obsoletos
      gcTime: 1000 * 60 * 15, // 15 minutos en memoria antes de garbage collection
      retry: 2, // 2 reintentos en caso de fallo de red
      refetchOnWindowFocus: false, // Evitar peticiones redundantes al cambiar de pestaña en dev
    },
    mutations: {
      retry: 1,
    },
  },
});
