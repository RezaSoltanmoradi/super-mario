const smallDevice = window.innerWidth <= 760;

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

  if (isRightMoving) {
    lastDirection = "right"; // ذخیره آخرین جهت
    character.classList.remove("standingRight");
    character.classList.remove("standingLeft");
    character.classList.remove("runningLeft");
    character.classList.add("runningRight");

    characterX += characterSpeed;

    if (smallDevice) {
      backgroundX += characterSpeed;
    } else {
      backgroundX -= characterSpeed;
    }
  } else if (isLeftMoving) {
    lastDirection = "left"; // ذخیره آخرین جهت
    character.classList.remove("standingRight");
    character.classList.remove("standingLeft");
    character.classList.remove("runningRight");
    character.classList.add("runningLeft");
    characterX -= characterSpeed;
    if (smallDevice) {
      backgroundX -= characterSpeed;
    } else {
      backgroundX += characterSpeed;
    }
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

  if (characterX > -2 && characterX < 90) {
    character.style.left = characterX + "%";
  }
  if (characterX <= -2) {
    characterX = -2;
  } else if (characterX >= 85) {
    characterX = 85;
  }
  gameContainer.style.backgroundPositionX = backgroundX + "%";
}
