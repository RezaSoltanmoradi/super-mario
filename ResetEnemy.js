function resetSingleEnemy({ enemy, isAlive, firstComing }) {
  if (modalIsOpen) return;
  // حذف انیمیشن و بازنشانی موقعیت دشمن
  enemy.style.animation = "none";
  // enemy.style.display = "none";
  enemy.style.left = "120%"; // بازگرداندن دشمن به موقعیت اولیه

  // اعمال تغییرات بلافاصله
  enemy.offsetHeight; // ترفند برای بازنشانی تغییرات CSS

  if (firstComing) {
    setTimeout(() => {
      enemy.style.animation = `pipeAnimation 7s linear forwards`;
      firstComing = false;
    }, 50); // کمی تأخیر برای اطمینان از ثبت تغییرات
  } else if (!firstComing && !modalIsOpen) {
    let delay = Math.random() * 2 + 4; // تاخیر تصادفی بین ۲ تا ۵ ثانیه
    setTimeout(() => {
      enemy.style.animation = `pipeAnimation 7s linear forwards`;
    }, delay * 1000);
  }

  // نمایش نقطه برخورد در صورت مرگ دشمن
  if (!isAlive) {
    console.log('death',deathPos)
    collisionPoint.style.display = "flex";
    collisionPoint.style.left = deathPos.left;
    collisionPoint.style.top = deathPos.top;

    setTimeout(() => {
      collisionPoint.style.display = "none";
    }, 500);
  }
}
