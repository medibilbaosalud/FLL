/* global workbox */
self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

const CACHE_NAME = "archeosense-cache-v1";
const OFFLINE_URLS = ["/", "/app", "/data/sites.geojson", "/data/time_series.json"];

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(request);
      if (cached) return cached;
      try {
        const response = await fetch(request);
        if (OFFLINE_URLS.some((url) => request.url.includes(url))) {
          cache.put(request, response.clone());
        }
        return response;
      } catch (error) {
        if (request.destination === "document") {
          return cache.match("/");
        }
        throw error;
      }
    })
  );
});
