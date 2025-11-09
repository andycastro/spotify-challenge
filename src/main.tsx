import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { queryClient } from './api/configs/queryClientConfig';
import { AuthProvider } from './api/contexts/AuthContext.tsx';
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
    <ThemeProvider defaultTheme="system" storageKey="spotify-challenge-theme">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />

          <ReactQueryDevtools initialIsOpen={false} />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
