// Nom du cache
const CACHE = "studyquest-offline-v4";
const offlineFallbackPage = "/offline.html";

// Importation de Workbox
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

// Écouteur pour les mises à jour du service worker
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Précache les ressources essentielles
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => {
        return cache.addAll([
          offlineFallbackPage,
          '/',
          '/index.html',
          '/styles/main.css',
          '/scripts/main.js'
        ]);
      })
  );
});

// Active le préchargement de navigation
if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

// Stratégie pour les requêtes de navigation (pages HTML)
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        // 1. Essaie d'abord le préchargement
        const preloadResponse = await event.preloadResponse;
        if (preloadResponse) {
          return preloadResponse;
        }

        // 2. Sinon, essaie une requête réseau classique
        const networkResponse = await fetch(event.request);
        return networkResponse;
      } catch (error) {
        // 3. Si tout échoue, retourne la page hors ligne
        const cache = await caches.open(CACHE);
        const cachedResponse = await cache.match(offlineFallbackPage);
        return cachedResponse;
      }
    })());
  }
});

// Stratégie pour les ressources statiques
workbox.routing.registerRoute(
  /\.(?:png|jpg|jpeg|svg|gif|webp|ico|css|js|woff2?|ttf|eot)$/,
  new workbox.strategies.CacheFirst({
    cacheName: `${CACHE}-assets`,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60,
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

// Synchronisation en arrière-plan (Background Sync)
const bgSyncPlugin = new workbox.backgroundSync.BackgroundSyncPlugin('studyquestQueue', {
  maxRetentionTime: 24 * 60, // 24 heures
});

workbox.routing.registerRoute(
  /\/api\/.*\/.*/,
  new workbox.strategies.NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  'POST'
);

// Notifications Push
self.addEventListener('push', (event) => {
  const data = event.data?.json();
  const title = data?.title || 'Studyquest Notification';
  const options = {
    body: data?.body || 'Vous avez une nouvelle notification de Studyquest.',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Écouteur pour les clics sur les notifications
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data?.url || '/')
  );
});

// Synchronisation périodique (Periodic Sync)
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'sync-studyquest-data') {
    event.waitUntil(syncStudyquestData());
  }
});

async function syncStudyquestData() {
  console.log('Synchronisation périodique des données Studyquest...');
}

// Cache des requêtes API pour le support hors ligne
workbox.routing.registerRoute(
  /\/api\/.*/,
  new workbox.strategies.NetworkFirst({
    cacheName: `${CACHE}-api`,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 30,
        maxAgeSeconds: 24 * 60 * 60, // 1 jour
      }),
    ],
  })
);
