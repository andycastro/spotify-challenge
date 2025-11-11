import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner';
import { queryClient } from './api/configs/queryClientConfig';
import { AuthProvider } from './api/contexts/AuthContext.tsx';
import App from './App.tsx';
import './i18n';
import './index.css';
import { ThemeProvider } from './lib';
import { registerServiceWorker } from './utils/serviceWorker';

// Registrar Service Worker quando a página carregar
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    registerServiceWorker();
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="spotify-challenge-theme">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
          <Toaster
            richColors
            position="top-right"
            closeButton
            toastOptions={{
              classNames: {
                toast:
                  'bg-white text-neutral-900 border border-green-500/10 shadow-[0_0_0_1px_rgba(16,16,16,0.06)] dark:bg-[#121212] dark:text-neutral-100 dark:border-[#1ed7601a] dark:shadow-[0_0_0_1px_#1ed76010]',
                title: 'font-medium',
                description: 'text-xs text-neutral-600 dark:text-neutral-400',
              },
            }}
          />

          <ReactQueryDevtools initialIsOpen={false} />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
