// **پرش شخصیت بازی**
function jump() {
  if (isJumping || gameIsOver) return; // اگر در حال پرش یا نشستن بود، اجرا نشود
  if (isOnWall) return;

  isJumping = true;
  isSitting = false;
  jumpSound.play();
  character.classList.remove("standAnimate");
  character.classList.remove("sitAnimate");
  character.classList.remove("fellAnimate");
  if (isSmallCharacter) {
    character.classList.remove("smallAnimate");
    character.classList.add("smallJumpAnimate");
  } else {
    character.classList.remove("bigAnimate");
    character.classList.add("jumpAnimate");
  }
  setTimeout(() => {
    character.classList.remove("jumpAnimate");
    character.classList.remove("smallJumpAnimate");
    isJumping = false;
  }, 1000);
}
