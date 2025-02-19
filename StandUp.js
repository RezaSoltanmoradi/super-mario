// **برخواستن شخصیت بازی**
function standUp() {
  if (!isSitting || gameIsOver || isSmallCharacter || isOnWall) return;
  isSitting = false;
  isJumping = false;
  character.classList.remove("fellAnimate");
  character.classList.remove("jumpAnimate");
  character.classList.remove("bigAnimate");
  character.classList.remove("sitAnimate");
  character.classList.add("standAnimate");
  setTimeout(() => {
    character.classList.remove("standAnimate"); // بعد از پایان انیمیشن، کلاس را حذف کن
  }, 1000);
}
