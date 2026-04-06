// ===== STUDYQUEST SERVICE WORKER — Sans dépendance externe =====
const CACHE = "studyquest-v7";
const ASSETS_CACHE = "studyquest-v7-assets";
const OFFLINE_PAGE = "offline.html";
const ICON = "launchericon-192x192.png";
const BADGE = "launchericon-72x72.png";

const PRECACHE_URLS = [
  OFFLINE_PAGE,
  "index.html",
  "manifest.json",
  "launchericon-192x192.png",
  "launchericon-512x512.png",
  "launchericon-144x144.png",
  "launchericon-96x96.png",
  "launchericon-72x72.png",
  "launchericon-48x48.png",
];

// ===== MESSAGES =====
self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") self.skipWaiting();
});

// ===== INSTALL =====
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then((cache) =>
      Promise.allSettled(PRECACHE_URLS.map(url => cache.add(url)))
    )
  );
});

// ===== ACTIVATE =====
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== CACHE && k !== ASSETS_CACHE)
          .map((k) => caches.delete(k))
      )
    ).then(() => {
      self.clients.claim();
      // Periodic sync — optionnel, ne plante pas si non supporté
      if (self.registration.periodicSync) {
        self.registration.periodicSync
          .register("studyquest-reminder", { minInterval: 12 * 60 * 60 * 1000 })
          .catch(() => {});
      }
    })
  );
});

// ===== FETCH — Stratégie intelligente sans Workbox =====
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignore les requêtes non-GET et cross-origin (API Claude, fonts, etc.)
  if (request.method !== "GET") return;
  if (url.origin !== self.location.origin) return;

  // Navigation (pages HTML) — Network First avec fallback offline
  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const networkRes = await fetch(request);
          const cache = await caches.open(CACHE);
          cache.put(request, networkRes.clone());
          return networkRes;
        } catch {
          const cached =
            (await caches.match(request)) ||
            (await caches.match(OFFLINE_PAGE));
          return cached || new Response("Hors ligne", { status: 503 });
        }
      })()
    );
    return;
  }

  // Images — Cache First
  if (/\.(png|jpg|jpeg|svg|gif|webp|ico|woff2?|ttf|eot)$/i.test(url.pathname)) {
    event.respondWith(
      caches.open(ASSETS_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        if (cached) return cached;
        try {
          const networkRes = await fetch(request);
          cache.put(request, networkRes.clone());
          return networkRes;
        } catch {
          return cached || new Response("", { status: 404 });
        }
      })
    );
    return;
  }

  // Tout le reste — Stale While Revalidate
  event.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const cached = await cache.match(request);
      const fetchPromise = fetch(request)
        .then((res) => { cache.put(request, res.clone()); return res; })
        .catch(() => null);
      return cached || fetchPromise || new Response("", { status: 503 });
    })
  );
});

// ===== PERIODIC SYNC =====
self.addEventListener("periodicsync", (event) => {
  if (event.tag === "studyquest-reminder") {
    event.waitUntil(sendReminder());
  }
});

async function sendReminder() {
  const msgs = [
    { title: "📚 StudyQuest t'attend !", body: "Tu n'as pas encore révisé aujourd'hui !" },
    { title: "🔥 Ta série est en danger !", body: "Ne laisse pas tomber ta streak !" },
    { title: "⭐ Du XP t'attend !", body: "Complète ta mission du jour !" },
    { title: "🧠 Révise maintenant !", body: "Tes parents seront fiers. Allez !" },
  ];
  const msg = msgs[Math.floor(Math.random() * msgs.length)];
  return self.registration.showNotification(msg.title, {
    body: msg.body,
    icon: ICON,
    badge: BADGE,
    tag: "studyquest-reminder",
    renotify: true,
    actions: [
      { action: "open", title: "🚀 Réviser" },
      { action: "dismiss", title: "Plus tard" },
    ],
  });
}

// ===== PUSH NOTIFICATIONS =====
self.addEventListener("push", (event) => {
  const data = event.data?.json() || {};
  event.waitUntil(
    self.registration.showNotification(data.title || "📚 StudyQuest", {
      body: data.body || "C'est l'heure de réviser !",
      icon: ICON,
      badge: BADGE,
      tag: "studyquest-push",
      renotify: true,
      data: { url: data.url || "./" },
    })
  );
});

// ===== NOTIFICATION CLICK =====
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  if (event.action === "dismiss") return;
  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((list) => {
        for (const c of list) {
          if (c.url.includes("Studyquest") && "focus" in c) return c.focus();
        }
        return clients.openWindow(
          event.notification.data?.url || "./"
        );
      })
  );
});

// ===== BACKGROUND SYNC =====
self.addEventListener("sync", (event) => {
  if (event.tag === "studyquest-sync") {
    event.waitUntil(doSync());
  }
});

async function doSync() {
  // Synchronisation des données en attente
  const cache = await caches.open(CACHE);
  const urls = ["index.html", "manifest.json"];
  await Promise.allSettled(
    urls.map((url) =>
      fetch(url)
        .then((r) => cache.put(url, r))
        .catch(() => {})
    )
  );
}
