/**
 * Service Worker registration utility
 */

export const registerServiceWorker = (): void => {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  navigator.serviceWorker
    .register('/sw.js')
    .then(registration => {
      console.log('SW registered: ', registration);
    })
    .catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
};
