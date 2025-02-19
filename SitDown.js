
// **نشستن شخصیت بازی**
function sitDown() {
    if (isSitting || gameIsOver || isSmallCharacter || isOnWall) return;
    else {
      character.classList.remove("jumpAnimate");
      character.classList.remove("bigAnimate");
      character.classList.remove("standAnimate");
      character.classList.add("sitAnimate");
      isSitting = true;
      isJumping = false;
    }
  }