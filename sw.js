// Nom du cache (versionné pour éviter les conflits)
const CACHE = "studyquest-offline-v1";
// Chemin vers ta page hors ligne (à adapter si nécessaire)
const offlineFallbackPage = "/offline.html";

// Importation de Workbox
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

// Écouteur pour les mises à jour du service worker
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Précache la page hors ligne lors de l'installation
self.addEventListener('install', async (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.add(offlineFallbackPage))
  );
});

// Active le préchargement de navigation pour accélérer les chargements
if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

// Stratégie pour les requêtes de navigation (pages HTML)
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        // Essaie d'abord le préchargement
        const preloadResponse = await event.preloadResponse;
        if (preloadResponse) {
          return preloadResponse;
        }

        // Sinon, essaie une requête réseau classique
        const networkResponse = await fetch(event.request);
        return networkResponse;
      } catch (error) {
        // Si tout échoue, retourne la page hors ligne
        const cache = await caches.open(CACHE);
        const cachedResponse = await cache.match(offlineFallbackPage);
        return cachedResponse;
      }
    })());
  }
});

// Stratégie pour les ressources statiques (images, CSS, JS, polices)
workbox.routing.registerRoute(
  /\.(?:png|jpg|jpeg|svg|gif|webp|ico|css|js|woff2?|ttf|eot)$/,
  new workbox.strategies.CacheFirst({
    cacheName: `${CACHE}-assets`,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 60, // Limite à 60 fichiers en cache
        maxAgeSeconds: 30 * 24 * 60 * 60, // Cache valide 30 jours
      }),
    ],
  })
);

// Stratégie par défaut pour les autres requêtes
workbox.routing.setDefaultHandler(
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE,
  })
);