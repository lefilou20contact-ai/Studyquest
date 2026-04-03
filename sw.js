const CACHE = "studyquest-v6";
const offlineFallbackPage = "offline.html";
const ICON = "launchericon-192x192.png";
const BADGE = "launchericon-72x72.png";

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

// ===== MESSAGES =====
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
});

// ===== INSTALL — précache tout =====
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll([
      offlineFallbackPage,
      "index.html",
      "manifest.json",
      "launchericon-192x192.png",
      "launchericon-512x512.png",
      "launchericon-144x144.png",
      "launchericon-96x96.png",
      "launchericon-72x72.png",
      "launchericon-48x48.png",
    ]).catch(() => cache.add(offlineFallbackPage)))
  );
  self.skipWaiting();
});

// ===== ACTIVATE =====
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE && k !== CACHE+"-assets").map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
  self.registration.periodicSync?.register('studyquest-daily-reminder', {
    minInterval: 12 * 60 * 60 * 1000
  }).catch(() => {});
  self.registration.periodicSync?.register('studyquest-cache-update', {
    minInterval: 24 * 60 * 60 * 1000
  }).catch(() => {});
});

// ===== NAVIGATION PRELOAD =====
if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

// ===== FETCH + OFFLINE SUPPORT COMPLET =====
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preloadResponse = await event.preloadResponse;
        if (preloadResponse) {
          const cache = await caches.open(CACHE);
          cache.put(event.request, preloadResponse.clone());
          return preloadResponse;
        }
        const networkResponse = await fetch(event.request);
        const cache = await caches.open(CACHE);
        cache.put(event.request, networkResponse.clone());
        return networkResponse;
      } catch (error) {
        const cache = await caches.open(CACHE);
        const cached = await cache.match(event.request);
        if (cached) return cached;
        const offline = await cache.match(offlineFallbackPage);
        return offline;
      }
    })());
    return;
  }

  // Assets : cache-first
  if (/\.(?:png|jpg|jpeg|svg|gif|webp|ico|woff2?|ttf|eot)$/.test(event.request.url)) {
    event.respondWith(
      caches.open(CACHE+"-assets").then(cache =>
        cache.match(event.request).then(cached => {
          if (cached) return cached;
          return fetch(event.request).then(response => {
            cache.put(event.request, response.clone());
            return response;
          }).catch(() => cached);
        })
      )
    );
    return;
  }

  // CSS/JS : stale-while-revalidate
  if (/\.(?:css|js)$/.test(event.request.url)) {
    event.respondWith(
      caches.open(CACHE).then(cache =>
        cache.match(event.request).then(cached => {
          const fetchPromise = fetch(event.request).then(response => {
            cache.put(event.request, response.clone());
            return response;
          });
          return cached || fetchPromise;
        })
      )
    );
  }
});

// ===== ASSETS CacheFirst (Workbox) =====
workbox.routing.registerRoute(
  /\.(?:png|jpg|jpeg|svg|gif|webp|ico|css|js|woff2?|ttf|eot)$/,
  new workbox.strategies.CacheFirst({
    cacheName: CACHE+"-assets",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  })
);

// ===== DEFAULT =====
workbox.routing.setDefaultHandler(
  new workbox.strategies.StaleWhileRevalidate({ cacheName: CACHE })
);

// ===== BACKGROUND SYNC =====
const bgSyncPlugin = new workbox.backgroundSync.BackgroundSyncPlugin('studyquest-sync-queue', {
  maxRetentionTime: 24 * 60,
});
workbox.routing.registerRoute(
  /\/api\/.*/,
  new workbox.strategies.NetworkOnly({ plugins: [bgSyncPlugin] }),
  'POST'
);

// ===== SHARE TARGET =====
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (url.searchParams.has('title') || url.searchParams.has('text')) {
    event.respondWith(Response.redirect('index.html'));
  }
});

// ===== FILE HANDLER =====
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (url.searchParams.has('file')) {
    event.respondWith(Response.redirect('index.html?action=scan'));
  }
});

// ===== PERIODIC SYNC =====
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'studyquest-daily-reminder') event.waitUntil(sendDailyReminder());
  if (event.tag === 'studyquest-cache-update') event.waitUntil(updateCache());
});

async function sendDailyReminder() {
  const msgs = [
    { title: '📚 StudyQuest t\'attend !', body: 'Tu n\'as pas encore révisé aujourd\'hui !' },
    { title: '🔥 Ta série est en danger !', body: 'Ne laisse pas tomber ta streak !' },
    { title: '⭐ Du XP t\'attend !', body: 'Complète ta mission du jour !' },
    { title: '🧠 Révise maintenant !', body: 'Tes parents seront fiers. Allez !' },
  ];
  const msg = msgs[Math.floor(Math.random() * msgs.length)];
  return self.registration.showNotification(msg.title, {
    body: msg.body, icon: ICON, badge: BADGE,
    tag: 'daily-reminder', renotify: true,
    actions: [
      { action: 'open', title: '🚀 Réviser' },
      { action: 'dismiss', title: 'Plus tard' }
    ]
  });
}

async function updateCache() {
  const cache = await caches.open(CACHE);
  const urls = ["index.html", "manifest.json"];
  await Promise.all(urls.map(url => fetch(url).then(r => cache.put(url, r)).catch(() => {})));
}

// ===== PUSH =====
self.addEventListener('push', (event) => {
  const data = event.data?.json() || {};
  event.waitUntil(
    self.registration.showNotification(data.title || '📚 StudyQuest', {
      body: data.body || 'C\'est l\'heure de réviser !',
      icon: ICON, badge: BADGE, tag: 'studyquest-push', renotify: true,
      data: { url: data.url || './' }
    })
  );
});

// ===== NOTIFICATION CLICK =====
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'dismiss') return;
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      for (const c of list) {
        if (c.url.includes('Studyquest') && 'focus' in c) return c.focus();
      }
      return clients.openWindow(event.notification.data?.url || './');
    })
  );
});

// ===== WIDGET =====
self.addEventListener('widgetclick', (event) => {
  if (event.action === 'quiz') clients.openWindow('./index.html?action=quiz');
  if (event.action === 'scan') clients.openWindow('./index.html?action=scan');
});
