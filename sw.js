const CACHE_NAME = "game-cache";
const FILES_TO_CACHE = [
  "./index.html",
  "./index.css",
  "./app.js",
  "./GameOver.js",
  "./Moving.js",
  "./ValidAccident.js",
  "./StandUp.js",
  "./ResetEnemies.js",
  "./ResetEnemy.js",
  "./SitDown.js",
  "./Modal.js",
  "./Jump.js",
  "./Modal.css",
  "./styles/character.css",
  "./styles/characterEvent.css",
  "./styles/enemies.css",
  "./styles/mushroom.css",
  "./styles/smallDeviceBtn.css",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// مدیریت درخواست‌های fetch
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || caches.match("./index.html");
      });
    })
  );
});
