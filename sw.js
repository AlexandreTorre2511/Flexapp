// Flex : l'app s'ouvre même sans réseau ; les données passent toujours par Supabase.
const CACHE = "flex-v4";
const SHELL = ["./", "index.html", "config.js", "manifest.webmanifest", "img/flex-logo.png",
  "img/etherea.jpg", "img/d06.jpg", "img/adc.jpg", "img/ran.jpg", "icons/icon-192.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== "GET" || url.hostname.endsWith("supabase.co")) return;
  const sameOrigin = url.origin === location.origin;
  if (req.mode === "navigate" || (sameOrigin && /\.(html|js)$/.test(url.pathname))) {
    // Réseau d'abord pour avoir la dernière version, cache si hors ligne.
    e.respondWith(fetch(req).then(r => { const c = r.clone(); caches.open(CACHE).then(x => x.put(req, c)); return r; })
      .catch(() => caches.match(req).then(r => r || caches.match("index.html"))));
    return;
  }
  // Images, polices et bibliothèques : cache d'abord, mis à jour en arrière plan.
  e.respondWith(caches.match(req).then(hit => {
    const net = fetch(req).then(r => { if (r.ok || r.type === "opaque") { const c = r.clone(); caches.open(CACHE).then(x => x.put(req, c)); } return r; }).catch(() => hit);
    return hit || net;
  }));
});
