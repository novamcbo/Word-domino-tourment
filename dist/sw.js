const CACHE = 'domino-club-shell-v1';
const FILES = ['./', './index.html', './style.css', './app.mjs', './engine.mjs', './layout.mjs', './platform.mjs', './manifest.webmanifest', './icon.svg', './icon-180.png', './icon-192.png', './icon-512.png'];
const URLs = new Set(FILES.map(file => new URL(file, self.registration.scope).href));
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('domino-club-shell-') && key !== CACHE).map(key => caches.delete(key)))));
});
// Cache only this app's explicit static files, never authentication or API requests.
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || !URLs.has(event.request.url)) return;
  event.respondWith(fetch(event.request).then(response => {
    if (response.ok && !response.redirected && response.type === 'basic') {
      const copy = response.clone();
      event.waitUntil(caches.open(CACHE).then(cache => cache.put(event.request, copy)));
    }
    return response;
  }).catch(async () => (await caches.match(event.request)) || Response.error()));
});
