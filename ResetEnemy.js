let previousDelay = 0;
let previousDeathTime = 0;
let delayCounter = 0;

function resetSingleEnemy({ enemy, isAlive, firstComing }) {
  if (modalIsOpen) return;

  enemy.style.animation = "none";
  enemy.style.left = "120%"; // بازگرداندن دشمن به موقعیت اولیه
  enemy.offsetHeight; // ترفند برای بازنشانی تغییرات CSS

  let currentTime = Date.now();
  let timeSinceLastDeath = (currentTime - previousDeathTime) / 1000; // اختلاف زمانی مرگ قبلی

  if (firstComing) {
    setTimeout(() => {
      enemy.style.animation = `pipeAnimation 7s linear forwards`;
      firstComing = false;
    }, 50);
  } else if (!firstComing && !modalIsOpen) {
    let delay = Math.random() * 3 + 1; // تاخیر تصادفی بین 1 تا 4 ثانیه
    if (timeSinceLastDeath < previousDelay + 1) {
      delay += 1.5; // اگر دو دشمن نزدیک هم بودند، ۱.۵ ثانیه اضافه کن
    }
    previousDelay = delay;
    previousDeathTime = currentTime; // ذخیره آخرین زمان مرگ

    setTimeout(() => {
      enemy.style.animation = `pipeAnimation 7s linear forwards`;
    }, delay * 1000);
  }

  if (!isAlive) {
    collisionPoint.style.display = "flex";
    collisionPoint.style.left = deathPos.left;
    collisionPoint.style.top = deathPos.top;

    setTimeout(() => {
      collisionPoint.style.display = "none";
    }, 500);
  }
}
