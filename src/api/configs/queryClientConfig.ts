import { QueryClient } from '@tanstack/react-query';

/**
 * Configurações do React Query
 */
export const queryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,

      gcTime: 10 * 60 * 1000,

      retry: 2,

      refetchOnWindowFocus: false,

      refetchOnReconnect: false,

      retryDelay: (attemptIndex: number) =>
        Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: 1,

      retryDelay: 1000,
    },
  },
};

/**
 * QueryClient com as configurações padrão
 */
export const createQueryClient = (): QueryClient => {
  return new QueryClient(queryClientConfig);
};

/**
 * Uso global
 */
export const queryClient = createQueryClient();
