const CACHE_NAME = "snes-webplayer-v2";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  const isEmulatorCdn = url.hostname === "cdn.emulatorjs.org";
  const isRomOrAsset =
    url.pathname.endsWith(".smc") ||
    url.pathname.endsWith(".sfc") ||
    url.pathname.endsWith(".zip") ||
    url.pathname.endsWith(".wasm") ||
    url.pathname.endsWith(".data") ||
    url.pathname.endsWith(".js") ||
    url.pathname.endsWith(".css");

  // Cache-First para a ROM e para o motor WebAssembly do EmulatorJS (carregamento em ~5ms a partir da 2ª visita)
  if (isEmulatorCdn || (url.origin === self.location.origin && isRomOrAsset)) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        cache.match(req).then((cached) => {
          if (cached) return cached;
          return fetch(req).then((res) => {
            if (res && res.status === 200) {
              cache.put(req, res.clone());
            }
            return res;
          });
        })
      )
    );
    return;
  }

  // Network-First com fallback de cache para o HTML principal
  if (req.mode === "navigate" || url.origin === self.location.origin) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => caches.match(req))
    );
  }
});
