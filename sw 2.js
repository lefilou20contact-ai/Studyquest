const CACHE = "studyquest-v4";
const BASE = "./";
const offlineFallbackPage = "offline.html";

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll([
      offlineFallbackPage,
      BASE,
      "index.html",
      "manifest.json",
      "launchericon-192x192.png",
      "launchericon-512x512.png",
    ]))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preloadResponse = await event.preloadResponse;
        if (preloadResponse) return preloadResponse;
        const networkResponse = await fetch(event.request);
        return networkResponse;
      } catch (error) {
        const cache = await caches.open(CACHE);
        const cachedResponse = await cache.match(offlineFallbackPage);
        return cachedResponse;
      }
    })());
  }
});

workbox.routing.registerRoute(
  /\.(?:png|jpg|jpeg|svg|gif|webp|ico|css|js|woff2?|ttf|eot)$/,
  new workbox.strategies.CacheFirst({
    cacheName: CACHE + "-assets",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  })
);

workbox.routing.setDefaultHandler(
  new workbox.strategies.StaleWhileRevalidate({ cacheName: CACHE })
);

self.addEventListener('push', (event) => {
  const data = event.data?.json();
  event.waitUntil(
    self.registration.showNotification(data?.title || 'StudyQuest', {
      body: data?.body || 'C\'est l\'heure de réviser ! 📚',
      icon: BASE + 'launchericon-192x192.png',
      badge: BASE + 'launchericon-72x72.png',
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow('./'));
});
