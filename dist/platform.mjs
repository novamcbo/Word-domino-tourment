// Native builds bundle all game assets; only the website needs an offline cache.
const native = window.Capacitor?.isNativePlatform?.() === true;
if (!native && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(error => console.warn('No se pudo activar el modo sin conexión.', error));
  });
}
