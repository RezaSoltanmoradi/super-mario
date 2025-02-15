// **تاخیر تصادفی برای بلوک‌ها (برای متعادل‌سازی بازی)**
function resetEnemies() {
  if (modalIsOpen) return;
  console.log("reset enemies ...");
  walkEnemy.style.animation = "none";
  airEnemy.style.animation = "none";
  walkEnemy.style.left = "120%"; // بازگرداندن دشمن به موقعیت اولیه
  airEnemy.style.left = "120%"; // بازگرداندن دشمن به موقعیت اولیه
  walkEnemy.offsetHeight; // ترفند برای بازنشانی تغییرات CSS
  airEnemy.offsetHeight; // ترفند برای بازنشانی تغییرات CSS

  setTimeout(() => {
    deathSound.pause();
    startSound.play();
  }, 3000);
  walkEnemy.style.animation = `pipeAnimation 7s infinite linear`;
  airEnemy.style.animation = `pipeAnimation 7s infinite linear`;
  walkEnemy.style.animationDelay = `5s`;
  airEnemy.style.animationDelay = `3s`;
}
