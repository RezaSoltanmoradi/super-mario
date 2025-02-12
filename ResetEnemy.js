function resetSingleEnemy(enemy, enemyIsAlive) {
  enemy.style.animation = "none"; // حذف انیمیشن قبلی
  if (!enemyIsAlive) {
    collisionPoint.style.display = "flex";
    collisionPoint.style.left = deathPos.left;
    collisionPoint.style.top = deathPos.top;
  }
  let delay = Math.random() * 3 + 4; // تاخیر تصادفی بین ۲ تا ۵ ثانیه
  setTimeout(() => {
    enemy.style.left = "100%"; // بازگرداندن دشمن به سمت راست صفحه
    enemy.offsetHeight; // ترفند برای اعمال مجدد انیمیشن
    enemy.style.animation = `pipeAnimation 10s linear forwards`;
  }, delay * 1000);
}
