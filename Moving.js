let characterMovePercentage;

function moving() {
  if (gameIsOver && modalIsOpen) {
    character.classList.remove("runningLeft", "runningRight");
    if (lastDirection === "right") {
      character.classList.add("standingRight");
    } else {
      character.classList.add("standingLeft");
    }
    clearInterval(movment);
    return;
  }

  // همگام‌سازی موقعیت واقعی با مقدار ذخیره‌شده
  const currentRealX =
    character.getBoundingClientRect().left -
    gameImage.getBoundingClientRect().left;

  // فقط وقتی که فاصله زیاد است مقدار ذخیره‌شده به‌روزرسانی می‌شود
  if (Math.abs(currentRealX - characterX) > 0.5) {
    characterX = currentRealX;
  }

  const imageWidth = gameImage.offsetWidth;
  const characterWidth = character.offsetWidth;
  const containerWidth = gameContainer.clientWidth;
  const maxCharacterX = imageWidth - characterWidth;

  // منطق حرکت
  if (isRightMoving) {
    if (characterX < maxCharacterX) {
      characterX = Math.min(characterX + characterSpeed, maxCharacterX);
    }
    lastDirection = "right";
  } else if (isLeftMoving) {
    if (characterX > 0) {
      characterX = Math.max(characterX - characterSpeed, 0);
    }
    lastDirection = "left";
  }

  // اعمال موقعیت با transform
  character.style.left = characterX + "px";

  // مدیریت کلاس‌های انیمیشن
  character.classList.toggle("runningRight", isRightMoving);
  character.classList.toggle("runningLeft", isLeftMoving);
  character.classList.toggle(
    "standingRight",
    !isRightMoving && lastDirection === "right"
  );
  character.classList.toggle(
    "standingLeft",
    !isLeftMoving && lastDirection === "left"
  );

  smoothScroll();
}
requestAnimationFrame(moving);

function smoothScroll() {
  const imageWidth = gameImage.offsetWidth;
  const containerWidth = gameContainer.clientWidth;
  const maxScroll = imageWidth - containerWidth;

  // محاسبه موقعیت هدف بر اساس مرکز کاراکتر
  const targetScroll =
    (characterX + character.offsetWidth / 2 - containerWidth / 2) *
    (maxScroll / (imageWidth - containerWidth));

  // محدود کردن مقادیر
  const clampedScroll = Math.min(Math.max(targetScroll, 0), maxScroll);

  // اعمال اسکرول با اثر نرم
  gameContainer.scrollLeft = clampedScroll;
}
