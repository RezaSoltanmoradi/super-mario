function gameIsOverHandler(walkRect, airRect, enemy, charRect) {
  heart--;
  gameIsOver = true;
  enemy.style.animation = "none";
  walkEnemy.style.left = `${walkRect.left}px`;
  airEnemy.style.left = `${airRect.left}px`;
  character.style.display = "none";
  startSound.pause();
  deathSound.play();
  showModal({ gameIsOver, stage });
}
