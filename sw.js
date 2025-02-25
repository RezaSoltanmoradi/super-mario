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
  "./styles/smallDeviceBtn.css",
  "./assets/img/Brick7.jpg",
  "./assets/img/enemy1.gif",
  "./assets/img/enemy2.gif",
  "./assets/img/gamePlay.jpg",
  "./assets/img/marioRunning.gif",
  "./assets/img/Mushroom.png",
  "./assets/img/stand3.png",
  "./assets/img/superMario.webp",
  "./assets/img/superMarioDeath.png",
  "./assets/img/superMarioSuccess.webp",
  "./assets/fonts/Mikhak-Light.ttf",
  "./assets/icons/airIcon.png",
  "./assets/icons/battleIcon.png",
  "./assets/icons/gameIcon.png",
  "./assets/icons/coin.png",
  "./assets/icons/heart.png",
  "./assets/icons/info.png",
  "./assets/icons/walkIcon.png",
  "./assets/icons/mushroomFav.png",
  "./assets/audio/death.mp3",
  "./assets/audio/jump.wav",
  "./assets/audio/starting.mp3",
  "./assets/audio/startin2.wav",
  "./assets/audio/airSound.wav",
  "./assets/audio/walkSound.wav",
  "./assets/audio/coin.wav",
  "./assets/audio/growSound.wav",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(
        FILES_TO_CACHE.map((file) =>
          cache
            .add(file)
            .catch((error) =>
              console.error("Failed to cache file:", file, error)
            )
        )
      );
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
