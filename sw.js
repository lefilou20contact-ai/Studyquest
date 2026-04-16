// StudyQuest Service Worker v7 — Sans dépendance externe
const CACHE = "studyquest-v7";
const ASSETS = "studyquest-v7-assets";
const OFFLINE = "offline.html";
const ICON = "launchericon-192x192.png";
const BADGE = "launchericon-72x72.png";

const PRECACHE = [
  OFFLINE, "index.html", "manifest.json",
  "launchericon-192x192.png", "launchericon-512x512.png",
  "launchericon-144x144.png", "launchericon-96x96.png",
  "launchericon-72x72.png", "launchericon-48x48.png",
  "widget-template.json", "widget-data.json",
];

// ===== MESSAGES =====
self.addEventListener("message", (e) => {
  if (e.data?.type === "SKIP_WAITING") self.skipWaiting();
});

// ===== INSTALL =====
self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then((cache) =>
      Promise.allSettled(PRECACHE.map((url) => cache.add(url)))
    )
  );
});

// ===== ACTIVATE =====
// Met à jour les widgets déjà installés au redémarrage du SW
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE && k !== ASSETS).map((k) => caches.delete(k))
      )
    )
    .then(() => self.clients.claim())
    .then(() => updateWidgets())
  );
  // Periodic sync rappel
  if (self.registration.periodicSync) {
    self.registration.periodicSync
      .register("studyquest-reminder", { minInterval: 12 * 60 * 60 * 1000 })
      .catch(() => {});
  }
});

// ===== FETCH — Offline Support complet =====
self.addEventListener("fetch", (e) => {
  const { request } = e;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    e.respondWith(
      (async () => {
        try {
          const net = await fetch(request);
          const cache = await caches.open(CACHE);
          cache.put(request, net.clone());
          return net;
        } catch {
          const cached = (await caches.match(request)) || (await caches.match(OFFLINE));
          return cached || new Response("Hors ligne", { status: 503 });
        }
      })()
    );
    return;
  }

  if (/\.(png|jpg|jpeg|svg|gif|webp|ico|woff2?|ttf)$/i.test(url.pathname)) {
    e.respondWith(
      caches.open(ASSETS).then(async (cache) => {
        const cached = await cache.match(request);
        if (cached) return cached;
        try {
          const net = await fetch(request);
          cache.put(request, net.clone());
          return net;
        } catch {
          return new Response("", { status: 404 });
        }
      })
    );
    return;
  }

  e.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const cached = await cache.match(request);
      const fetchPromise = fetch(request)
        .then((net) => { cache.put(request, net.clone()); return net; })
        .catch(() => null);
      return cached || fetchPromise || new Response("", { status: 503 });
    })
  );
});

// ===== BACKGROUND SYNC =====
self.addEventListener("sync", (e) => {
  if (e.tag === "studyquest-sync") {
    e.waitUntil(
      caches.open(CACHE).then((cache) =>
        Promise.allSettled(
          ["index.html", "manifest.json"].map((url) =>
            fetch(url).then((r) => cache.put(url, r)).catch(() => {})
          )
        )
      )
    );
  }
});

// ===== PERIODIC SYNC =====
self.addEventListener("periodicsync", async (event) => {
  // Rappels de révision
  if (event.tag === "studyquest-reminder") {
    event.waitUntil(sendReminder());
    return;
  }

  // Mise à jour du widget via periodic sync (même tag que widget.definition.tag)
  if (self.widgets) {
    const widget = await self.widgets.getByTag(event.tag);
    if (widget && "update" in widget.definition) {
      event.waitUntil(updateWidget(widget));
    }
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
    body: msg.body, icon: ICON, badge: BADGE,
    tag: "studyquest-reminder", renotify: true,
    actions: [
      { action: "open", title: "🚀 Réviser" },
      { action: "dismiss", title: "Plus tard" },
    ],
  });
}

// ===== PUSH NOTIFICATIONS =====
self.addEventListener("push", (e) => {
  const data = e.data?.json() || {};
  e.waitUntil(
    self.registration.showNotification(data.title || "📚 StudyQuest", {
      body: data.body || "C'est l'heure de réviser !",
      icon: ICON, badge: BADGE,
      tag: "studyquest-push", renotify: true,
      data: { url: data.url || "./" },
    })
  );
});

// ===== NOTIFICATION CLICK =====
self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  if (e.action === "dismiss") return;
  e.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      for (const c of list) {
        if (c.url.includes("Studyquest") && "focus" in c) return c.focus();
      }
      return clients.openWindow(e.notification.data?.url || "./");
    })
  );
});

// =====================================================
// ===== WINDOWS WIDGETS (PWA Widgets API) =============
// =====================================================

// Déclenché quand l'utilisateur ajoute le widget depuis le tableau de bord Windows
self.addEventListener("widgetinstall", (event) => {
  event.waitUntil(onWidgetInstall(event.widget));
});

// Déclenché quand l'utilisateur supprime le widget
self.addEventListener("widgetuninstall", (event) => {
  event.waitUntil(onWidgetUninstall(event.widget));
});

// Déclenché quand le widget host reprend le rendu après suspension
self.addEventListener("widgetresume", (event) => {
  event.waitUntil(updateWidget(event.widget));
});

// Déclenché quand l'utilisateur clique sur un bouton Action.Execute du widget
self.addEventListener("widgetclick", (event) => {
  switch (event.action) {
    case "open-app":
      event.waitUntil(
        clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
          for (const c of list) {
            if (c.url.includes("Studyquest") && "focus" in c) return c.focus();
          }
          return clients.openWindow("https://lefilou20contact-ai.github.io/Studyquest/");
        })
      );
      break;

    case "open-quiz":
      event.waitUntil(
        clients.openWindow("https://lefilou20contact-ai.github.io/Studyquest/?action=quiz")
      );
      break;

    case "open-scan":
      event.waitUntil(
        clients.openWindow("https://lefilou20contact-ai.github.io/Studyquest/?action=scan")
      );
      break;
  }
});

async function onWidgetInstall(widget) {
  // On utilise le même tag pour le periodic sync et le widget
  // pour éviter d'enregistrer plusieurs syncs pour le même widget
  const tags = await self.registration.periodicSync.getTags();
  if (!tags.includes(widget.definition.tag)) {
    await self.registration.periodicSync.register(widget.definition.tag, {
      minInterval: widget.definition.update,
    });
  }
  // Rendu immédiat dès l'installation
  await updateWidget(widget);
}

async function onWidgetUninstall(widget) {
  // Si c'était la dernière instance, on désenregistre le periodic sync
  if (widget.instances.length === 1 && "update" in widget.definition) {
    await self.registration.periodicSync.unregister(widget.definition.tag);
  }
}

// Appelée depuis activate() pour mettre à jour les widgets déjà installés
async function updateWidgets() {
  if (!self.widgets) return; // API non disponible (navigateur non supporté)

  const widget = await self.widgets.getByTag("studyquest-widget");
  if (!widget) return;

  const template = await (await fetch(widget.definition.msAcTemplate)).text();
  const data     = await (await fetch(widget.definition.data)).text();

  await self.widgets.updateByTag(widget.definition.tag, { template, data });
}

// Récupère template + data puis appelle updateByTag
async function updateWidget(widget) {
  const templateUrl = widget.definition.msAcTemplate;
  const dataUrl     = widget.definition.data;

  const template = await (await fetch(templateUrl)).text();
  const data     = await (await fetch(dataUrl)).text();

  await self.widgets.updateByTag(widget.definition.tag, { template, data });
}
