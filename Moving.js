let characterMovePercentage;
let imageWidth;

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
  const characterRect = character.getBoundingClientRect();
  imageWidth = gameImage.getBoundingClientRect().width;
  const maxCharacterX = imageWidth - characterRect.width; // حد نهایی حرکت کاراکتر

  if (isRightMoving && characterX + characterRect.width < imageWidth) {
    lastDirection = "right"; // ذخیره آخرین جهت
    character.classList.remove("standingRight");
    character.classList.remove("standingLeft");
    character.classList.remove("runningLeft");
    character.classList.add("runningRight");

    characterX = Math.min(characterX + characterSpeed, maxCharacterX);
  } else if (isLeftMoving && characterX > 0) {
    lastDirection = "left"; // ذخیره آخرین جهت
    character.classList.remove("standingRight");
    character.classList.remove("standingLeft");
    character.classList.remove("runningRight");
    character.classList.add("runningLeft");
    characterX = Math.max(characterX - characterSpeed, 0);
  } else if (
    characterX + characterRect.width === imageWidth ||
    characterX === 0
  ) {
    isRightMoving = false;
    isLeftMoving = false;
  }

  // **بررسی ایستادن**
  if (!isRightMoving && !isLeftMoving) {
    character.classList.remove("runningLeft", "runningRight");
    if (lastDirection === "right") {
      character.classList.add("standingRight");
    } else {
      character.classList.add("standingLeft");
    }
  }
  character.style.left = characterX + "px";
  // اسکرول آرام
  smoothScroll();
}
// فراخوانی حرکت به‌طور منظم، به جای استفاده از setInterval برای دقت بیشتر
requestAnimationFrame(moving);

function smoothScroll() {
  const maxScroll = imageWidth - deviceWidth;
  // const characterRect = character.getBoundingClientRect();
  // const scrollTriggerPoint = deviceWidth / 2;
  // const characterCenter = characterRect.left + characterRect.width / 2;

  // if (characterCenter >= scrollTriggerPoint) {
  // }

  characterMovePercentage = Math.min(
    Math.max((characterX - deviceWidth / 2) / maxScroll, 0),
    1
  );
  scrollPosition = Math.min(maxScroll, maxScroll * characterMovePercentage);

  scrollPosition = Math.min(scrollPosition, maxScroll);

  gameContainer.scrollLeft = scrollPosition;
}
