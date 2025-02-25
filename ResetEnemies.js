// **تاخیر تصادفی برای بلوک‌ها (برای متعادل‌سازی بازی)**
function resetEnemies() {
  if (modalIsOpen) return;
  walkEnemy.style.animation = "none";
  airEnemy.style.animation = "none";
  walkEnemy.style.left = "120%"; // بازگرداندن دشمن به موقعیت اولیه
  airEnemy.style.left = "120%"; // بازگرداندن دشمن به موقعیت اولیه
  walkEnemy.offsetHeight; // ترفند برای بازنشانی تغییرات CSS
  airEnemy.offsetHeight; // ترفند برای بازنشانی تغییرات CSS
  walkEnemy.style.animation = `pipeAnimation ${enemySpeed}s infinite linear`;
  airEnemy.style.animation = `pipeAnimation ${enemySpeed}s infinite linear`;
  walkEnemy.style.animationDelay = `10s`;
  airEnemy.style.animationDelay = `1s`;
}
