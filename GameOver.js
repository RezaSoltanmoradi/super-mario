function gameIsOverHandler(walkRect, airRect, enemy, charRect) {
  heart--;
  gameIsOver = true;
  enemy.style.animation = "none";
  walkEnemy.style.left = `${walkRect.left}px`;
  airEnemy.style.left = `${airRect.left}px`;
  character.style.display = "none";
  deathPos = {
    top: `${(charRect.top + charRect.bottom) / 2}px`,
    left: `${(charRect.right + charRect.left) / 2}px`,
  };
  collisionPoint.style.display = "flex";
  collisionPoint.style.left = deathPos.left;
  collisionPoint.style.top = deathPos.top;
  setTimeout(() => {
    collisionPoint.style.display = "none";
  }, 500);
  startSound.pause();
  deathSound.play();
  showModal({ gameIsOver, stage });
}
