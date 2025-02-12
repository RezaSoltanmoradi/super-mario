// **تاخیر تصادفی برای بلوک‌ها (برای متعادل‌سازی بازی)**
function resetEnemies() {
  let bestDelay = 0;
  let delay1;
  let delay2;
  while (bestDelay < 3) {
    delay1 = Math.random() * 5;
    delay2 = Math.random() * 5;
    bestDelay = Math.abs(delay1 - delay2);
    setTimeout(() => {
      deathSound.pause();
      startSound.play();
    }, 3000);
  }
  walkEnemy.style.animation = `pipeAnimation 5s infinite linear`;
  airEnemy.style.animation = `pipeAnimation 5s infinite linear`;
  walkEnemy.style.animationDelay = `${delay1}s`;
  airEnemy.style.animationDelay = `${delay2}s`;
}

