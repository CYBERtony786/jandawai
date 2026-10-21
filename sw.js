/* JanDawai service worker — cache-first app shell so the app opens in Airplane Mode. */

const CACHE_NAME = 'jandawai-shell-v2';

const SHELL = [
  './',
  'index.html',
  'styles.css',
  'app.js',
  'data/medicines.json',
  'manifest.webmanifest'
];

const CDN_HOSTS = ['cdn.jsdelivr.net'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const isCDN = CDN_HOSTS.includes(url.host);

  if (isCDN) {
    // Fuse.js is optional — the built-in engine covers offline. Cache it only if it arrives.
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        cache.match(req).then((hit) => {
          const network = fetch(req).then((res) => {
            if (res && res.ok) cache.put(req, res.clone());
            return res;
          }).catch(() => hit);
          return hit || network;
        })
      )
    );
    return;
  }

  if (url.origin !== self.location.origin) return;

  // Stale-while-revalidate: serve from cache immediately, refresh in the
  // background so a code fix reaches the next page load even offline.
  event.respondWith(
    caches.match(req).then((hit) => {
      const network = fetch(req)
        .then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => hit);
      return hit || network;
    })
  );
});
